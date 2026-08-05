const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];

const chart_theme = {
    fontFamily: 'Inter, "Segoe UI", system-ui, Arial, sans-serif',
    foreground: '#e5e7eb',
    muted: '#9ca3af',
    grid: 'rgba(255, 255, 255, 0.07)',
    card: '#1d1d1d',
    tooltipBg: '#0b0b0b',
    lime: '#cefd54',
    teal: '#2dd4bf',
    amber: '#fbbf24',
    coral: '#fb7185',
    violet: '#a78bfa',
    blue: '#60a5fa',
    green: '#34d399',
    slate: '#94a3b8',
    red: '#f43f5e'
};

const CHART_TOOLTIP = {
    theme: 'dark',
    style: { fontSize: '13px' },
    y: { formatter: value => value.toLocaleString() }
};

function createApexChart(selector, options) {
    const container = document.querySelector(selector);
    if (!container) return null;

    const chart = new window.ApexCharts(container, options);
    chart.render();
    return chart;
}

function fetchData(htmlFile) {
    fetch('Fatal Crashes.json')
        .then(response => response.json())
        .then(data => {
            const apchart = new ApexCharts();
            const chartjs = new ChartJS();

            switch (htmlFile) {
                case 'qu12.html':
                    apchart.Que1(data);
                    chartjs.Que2(data);
                    break;
                case 'qu34.html':
                    apchart.Que3(data);
                    chartjs.Que4(data);
                    break;
                case 'over-qu.html':
                    break;
                default:
                    console.error('Unknown HTML file:', htmlFile);
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

/* 
• What is the most dangerous day of the week to drive? -- ApexCharts -- Que1
• Is Christmas more dangerous than Easter? -- ChartJS -- Que2
• Are fatalities reducing over time? -- ApexCharts -- Que3
• Should I ride a motorbike? -- ChartJS -- Que4
*/
class ApexCharts {
    #createBaseOptions() {
        return {
            chart: {
                background: 'transparent',
                foreColor: chart_theme.foreground,
                fontFamily: chart_theme.fontFamily,
                toolbar: { show: false },
                animations: { easing: 'easeinout', speed: 800 }
            },
            grid: { borderColor: chart_theme.grid },
            dataLabels: { enabled: false },
            tooltip: { ...CHART_TOOLTIP },
            legend: { show: false },
            xaxis: {
                axisBorder: { color: chart_theme.grid },
                axisTicks: { color: chart_theme.grid },
                labels: { style: { colors: chart_theme.muted } }
            },
            yaxis: {
                labels: { style: { colors: chart_theme.muted } }
            }
        };
    }

    Que1(processedData) {
        const dayOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        const counts = {};

        processedData.forEach(record => {
            const day = record['Dayweek'];
            if (day) counts[day] = (counts[day] || 0) + 1;
        });

        const categories = dayOrder.filter(day => counts[day] !== undefined);
        const crashTotals = categories.map(day => counts[day]);
        const grandTotal = crashTotals.reduce((a, b) => a + b, 0);
        const sharePct = crashTotals.map(total => +((total / grandTotal) * 100).toFixed(1));

        createApexChart('#que1-chart', {
            ...this.#createBaseOptions(),
            chart: {
                ...this.#createBaseOptions().chart,
                type: 'line',
                height: 400
            },
            colors: [chart_theme.lime, chart_theme.amber],
            title: {
                text: 'What is the most dangerous day of the week to drive?',
                style: { color: chart_theme.foreground, fontSize: '18px', fontWeight: 600 }
            },
            subtitle: {
                text: 'Fatal crashes by day of the week (columns) with share of all crashes (line)',
                style: { color: chart_theme.muted, fontSize: '13px' }
            },
            series: [
                { name: 'Fatal crashes', type: 'column', data: crashTotals },
                { name: 'Share of crashes (%)', type: 'line', data: sharePct }
            ],
            plotOptions: { bar: { columnWidth: '55%', borderRadius: 6 } },
            stroke: { width: [0, 3], curve: 'smooth' },
            markers: { size: 5, colors: [chart_theme.amber], strokeColors: chart_theme.card, strokeWidth: 2 },
            xaxis: {
                categories,
                axisBorder: { color: chart_theme.grid },
                axisTicks: { color: chart_theme.grid },
                labels: { style: { colors: chart_theme.muted } }
            },
            yaxis: [
                {
                    title: { text: 'Fatal crashes', style: { color: chart_theme.muted } },
                    labels: { style: { colors: chart_theme.muted } }
                },
                {
                    opposite: true,
                    min: 0,
                    max: Math.max(...sharePct) + 2,
                    title: { text: 'Share of crashes (%)', style: { color: chart_theme.muted } },
                    labels: { formatter: value => value + '%', style: { colors: chart_theme.muted } }
                }
            ],
            tooltip: {
                theme: 'dark',
                shared: true,
                intersect: false,
                style: { fontSize: '13px' },
                y: {
                    formatter: value => Number.isInteger(value) ? value.toLocaleString() : value + '%'
                }
            },
            legend: {
                position: 'bottom',
                horizontalAlign: 'center',
                labels: { colors: chart_theme.foreground },
                markers: { size: 8 }
            }
        });
    }

    Que3(processedData) {
        const yearMonthData = {};
        const monthlyTotals = new Array(12).fill(0);

        processedData.forEach(record => {
            const year = record['Year'];
            const month = record['Month'];

            if (!year || !month) return;

            if (!yearMonthData[year]) yearMonthData[year] = new Array(12).fill(0);

            yearMonthData[year][month - 1]++;
            monthlyTotals[month - 1]++;
        });

        const years = Object.keys(yearMonthData).sort();
        const yearTotals = years.map(year => yearMonthData[year].reduce((a, b) => a + b, 0));

        const baseOptions = this.#createBaseOptions();
        let monthChart = null;

        createApexChart('#que3-year', {
            ...baseOptions,
            chart: {
                ...baseOptions.chart,
                id: 'q3-year',
                type: 'line',
                height: 320,
                events: {
                    click: (event, chartContext, config) => {
                        const year = years[config.dataPointIndex];
                        if (!year || !monthChart) return;

                        monthChart.updateSeries([{ name: `Fatal crashes in ${year}`, data: yearMonthData[year] }]);
                        monthChart.updateOptions({
                            subtitle: {
                                text: `Monthly fatal crashes in ${year}`,
                                style: { color: chart_theme.muted, fontSize: '13px' }
                            }
                        });
                    }
                }
            },
            colors: [chart_theme.teal],
            title: {
                text: 'Are fatalities reducing over time?',
                style: { color: chart_theme.foreground, fontSize: '18px', fontWeight: 600 }
            },
            subtitle: {
                text: 'Click a year point to see that year by month',
                style: { color: chart_theme.muted, fontSize: '13px' }
            },
            series: [{ name: 'Fatal crashes', data: yearTotals }],
            stroke: { curve: 'smooth', width: 3 },
            markers: { size: 5, hover: { size: 7 }, colors: [chart_theme.teal], strokeColors: chart_theme.card, strokeWidth: 2 },
            fill: {
                type: 'gradient',
                gradient: { shadeIntensity: 1, opacityFrom: 0.35, opacityTo: 0.05, stops: [0, 90, 100] }
            },
            xaxis: { ...baseOptions.xaxis, categories: years }
        });

        monthChart = createApexChart('#que3-month', {
            ...baseOptions,
            chart: {
                ...baseOptions.chart,
                id: 'q3-month',
                type: 'bar',
                height: 320
            },
            colors: [chart_theme.violet],
            title: {
                text: 'Fatal crashes by month of the year',
                style: { color: chart_theme.foreground, fontSize: '18px', fontWeight: 600 }
            },
            subtitle: {
                text: 'Seasonal pattern across all years',
                style: { color: chart_theme.muted, fontSize: '13px' }
            },
            series: [{ name: 'Fatal crashes (all years)', data: monthlyTotals }],
            plotOptions: { bar: { columnWidth: '55%', borderRadius: 6 } },
            xaxis: { ...baseOptions.xaxis, categories: MONTH_NAMES }
        });
    }
}

class ChartJS {
    createDoughnutChart(labels, data, titleText, subtitleText, colors, cutout = '60%') {
        const canvas = document.getElementById('myChart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');

        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels,
                datasets: [{
                    data,
                    backgroundColor: colors,
                    borderColor: chart_theme.card,
                    borderWidth: 4,
                    hoverOffset: 10,
                    borderRadius: 8,
                    spacing: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: { color: chart_theme.foreground, usePointStyle: true, pointStyle: 'rectRounded', padding: 14, font: { size: 12 } }
                    },
                    title: {
                        display: true,
                        text: titleText,
                        color: chart_theme.foreground,
                        font: { size: 18, weight: 600 },
                        padding: { bottom: 6 }
                    },
                    subtitle: {
                        display: true,
                        text: subtitleText,
                        color: chart_theme.muted,
                        font: { size: 13 },
                        padding: { bottom: 16 }
                    },
                    tooltip: {
                        backgroundColor: chart_theme.tooltipBg,
                        borderColor: 'rgba(255,255,255,0.1)',
                        borderWidth: 1,
                        titleColor: chart_theme.foreground,
                        bodyColor: chart_theme.foreground,
                        padding: 12,
                        cornerRadius: 8,
                        callbacks: {
                            label: context => ` ${context.label}: ${context.parsed.toLocaleString()}`
                        }
                    }
                }
            }
        });
    }

    Que2(processedData) {
        let christmasCount = 0;
        let easterCount = 0;

        processedData.forEach(record => {
            if (record['Christmas Period'] === 'Yes') christmasCount++;
            if (record['Easter Period'] === 'Yes') easterCount++;
        });

        this.createDoughnutChart(
            ['Christmas', 'Easter'],
            [christmasCount, easterCount],
            'Is Christmas more dangerous than Easter?',
            'Fatal crashes during the Christmas and Easter periods',
            [chart_theme.lime, chart_theme.coral],
            '62%'
        );
    }

    Que4(processedData) {
        let motorbikeCount = 0;
        let driverCount = 0;
        let passengerCount = 0;
        let pedestrianCount = 0;
        let cyclistCount = 0;

        processedData.forEach(record => {
            switch (record['Road User']) {
                case 'Motorcycle rider':
                    motorbikeCount++;
                    break;
                case 'Driver':
                    driverCount++;
                    break;
                case 'Passenger':
                    passengerCount++;
                    break;
                case 'Pedestrian':
                    pedestrianCount++;
                    break;
                case 'Pedal cyclist':
                    cyclistCount++;
                    break;
            }
        });

        this.createDoughnutChart(
            ['Motorcycle rider', 'Driver', 'Passenger', 'Pedestrian', 'Pedal cyclist'],
            [motorbikeCount, driverCount, passengerCount, pedestrianCount, cyclistCount],
            'Should I ride a motorbike?',
            'Fatal crashes by road user type',
            [chart_theme.amber, chart_theme.teal, chart_theme.blue, chart_theme.coral, chart_theme.green]
        );
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('nav div div div div div ul li a');

    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    switch (currentPage) {
        case 'index.html':
            fetchData('index.html');
            break;
        case 'qu12.html':
            fetchData('qu12.html');
            break;
        case 'qu34.html':
            fetchData('qu34.html');
            break;
        case 'over-qu.html':
            fetchData('over-qu.html');
            break;
    }

    const siteHeader = document.querySelector('.site-header');
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const dropdownBtns = document.querySelectorAll('.menu-btn[aria-expanded]');
    const backdrop = document.querySelector('.site-header-nav-backdrop');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            siteHeader.classList.toggle('site-header--mobile-open');
            mobileToggle.classList.toggle('mobile-menu-toggle--open');
            const isOpen = siteHeader.classList.contains('site-header--mobile-open');
            mobileToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
        });
    }

    dropdownBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const wasExpanded = btn.getAttribute('aria-expanded') === 'true';

            dropdownBtns.forEach(b => {
                b.setAttribute('aria-expanded', 'false');
                b.closest('li').classList.remove('site-header--expanded');
            });

            if (!wasExpanded) {
                btn.setAttribute('aria-expanded', 'true');
                btn.closest('li').classList.add('site-header--expanded');
                siteHeader.classList.add('site-header--expanded');
            } else {
                siteHeader.classList.remove('site-header--expanded');
            }
        });
    });

    if (backdrop) {
        backdrop.addEventListener('click', () => {
            dropdownBtns.forEach(b => {
                b.setAttribute('aria-expanded', 'false');
                b.closest('li').classList.remove('site-header--expanded');
            });

            siteHeader.classList.remove('site-header--expanded');
            siteHeader.classList.remove('site-header--mobile-open');

            if (mobileToggle) mobileToggle.classList.remove('mobile-menu-toggle--open');
        });
    }
});
