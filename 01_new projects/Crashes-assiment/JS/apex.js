import { mon_names, getCSSVariable } from './universal.js';

function createApexChart(selector, options) {
    const container = document.querySelector(selector);
    if (!container) return null;
    const chart = new window.ApexCharts(container, options);
    chart.render();
    return chart;
}
export class ApexCharts {
    constructor() {
        this.monthChart = null;
        this.motorbikeCount = 0;
        this.driverCount = 0;
        this.passengerCount = 0;
        this.pedestrianCount = 0;
        this.cyclistCount = 0;
    }
    #createBaseOptions() {
        return {
            chart: {
                background: 'transparent',
                foreColor: 'var(--chart-foreground)',
                fontFamily: 'var(--chart-font-family)',
                toolbar: { show: true },
                animations: { easing: 'easeinout', speed: 800 }
            },
            grid: { borderColor: 'var(--chart-grid)' },
            dataLabels: { enabled: false },
            tooltip: { theme: 'dark',
    style: { fontSize: '13px' },
    y: { formatter: value => value.toLocaleString() }},
            xaxis: {
                axisBorder: { color: 'var(--chart-grid)' }
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
            colors: ['var(--chart-lime)', 'var(--chart-amber)'],
            title: {
                text: 'What is the most dangerous day of the week to drive?',
                style: { color: 'var(--chart-foreground)', fontSize: '18px', fontWeight: 600 }
            },
            subtitle: {
                text: 'Fatal crashes by day of the week (columns) with share of all crashes (line)',
                style: { color: 'var(--chart-muted)', fontSize: '13px' }
            },
            series: [
                { name: 'Fatal crashes', type: 'column', data: crashTotals },
                { name: 'Share of crashes (%)', type: 'line', data: sharePct }
            ],
            plotOptions: { bar: { columnWidth: '55%', borderRadius: 6 } },
            stroke: { width: [0, 3], curve: 'smooth' },
            markers: { size: 5, colors: ['var(--chart-amber)'], strokeColors: 'var(--chart-card)', strokeWidth: 2 },
            xaxis: {
                categories,
                axisBorder: { color: 'var(--chart-grid)' },
                axisTicks: { color: 'var(--chart-grid)' },
                labels: { style: { colors: 'var(--chart-muted)' } }
            },
            yaxis: [
                {
                    title: { text: 'Fatal crashes', style: { color: 'var(--chart-muted)' } },
                    labels: { style: { colors: 'var(--chart-muted)' } }
                },
                {
                    opposite: true,
                    min: 0,
                    max: Math.max(...sharePct) + 2,
                    title: { text: 'Share of crashes (%)', style: { color: 'var(--chart-muted)' } },
                    labels: { formatter: value => value + '%', style: { colors: 'var(--chart-muted)' } }
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
                labels: { colors: 'var(--chart-foreground)' },
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
                        if (!year || !this.monthChart) return;

                        this.monthChart.updateSeries([{ name: `Fatal crashes in ${year}`, data: yearMonthData[year] }]);
                        this.monthChart.updateOptions({
                            subtitle: {
                                text: `Monthly fatal crashes in ${year}`,
                                style: { color: 'var(--chart-muted)', fontSize: '13px' }
                            }
                        });
                    }
                }
            },
            colors: ['var(--chart-teal)'],
            title: {
                text: 'Are fatalities reducing over time?',
                style: { color: 'var(--chart-foreground)', fontSize: '18px', fontWeight: 600 }
            },
            subtitle: {
                text: 'Click a year point to see that year by month',
                style: { color: 'var(--chart-muted)', fontSize: '13px' }
            },
            series: [{ name: 'Fatal crashes', data: yearTotals }],
            stroke: { curve: 'smooth', width: 3 },
            markers: { size: 5, hover: { size: 7 }, colors: ['var(--chart-teal)'], strokeColors: 'var(--chart-card)', strokeWidth: 2 },
            fill: {
                type: 'gradient',
                gradient: { shadeIntensity: 1, opacityFrom: 0.35, opacityTo: 0.05, stops: [0, 90, 100] }
            },
            xaxis: { ...baseOptions.xaxis, categories: years }
        });

        this.monthChart = createApexChart('#que3-month', {
            ...baseOptions,
            chart: {
                ...baseOptions.chart,
                id: 'q3-month',
                type: 'bar',
                height: 320
            },
            colors: ['var(--chart-violet)'],
            title: {
                text: 'Fatal crashes by month of the year',
                style: { color: 'var(--chart-foreground)', fontSize: '18px', fontWeight: 600 }
            },
            subtitle: {
                text: 'Seasonal pattern across all years',
                style: { color: 'var(--chart-muted)', fontSize: '13px' }
            },
            series: [{ name: 'Fatal crashes (all years)', data: monthlyTotals }],
            plotOptions: { bar: { columnWidth: '55%', borderRadius: 6 } },
            xaxis: { ...baseOptions.xaxis, categories: mon_names }
        });
    }

    Que4(processedData) {
        const labels = ['Motorcycle rider', 'Driver', 'Passenger', 'Pedestrian', 'Pedal cyclist'];
        const counts = labels.map(label => 0);

        processedData.forEach(record => {
            const index = labels.indexOf(record['Road User']);
            if (index !== -1) counts[index]++;
        });

        const total = counts.reduce((a, b) => a + b, 0);

        createApexChart('#que4-chart', {
            ...this.#createBaseOptions(),
            chart: {
                ...this.#createBaseOptions().chart,
                type: 'donut',
                height: 400
            },
            colors: ['var(--chart-amber)', 'var(--chart-teal)', 'var(--chart-blue)', 'var(--chart-coral)', 'var(--chart-green)'],
            labels,
            title: {
                text: 'Should I ride a motorbike?',
                style: { color: 'var(--chart-foreground)', fontSize: '18px', fontWeight: 600 }
            },
            subtitle: {
                text: 'Fatal crashes by road user type',
                style: { color: 'var(--chart-muted)', fontSize: '13px' }
            },
            series: counts,
            stroke: { colors: ['var(--chart-card)'], width: 4 },
            plotOptions: {
                pie: {
                    donut: { size: '62%' },
                    expandOnClick: true,
                    borderRadius: 8
                }
            },
            dataLabels: {
                enabled: true,
                formatter: (val, opts) => {
                    const count = opts.w.globals.series[opts.seriesIndex];
                    return `${opts.w.globals.labels[opts.seriesIndex]}: ${val.toFixed(1)}% (${count.toLocaleString()})`;
                }
            },
            tooltip: {
                theme: 'dark',
                style: { fontSize: '13px' },
                y: { formatter: value => value.toLocaleString() }
            },
            legend: {
                position: 'bottom',
                horizontalAlign: 'center',
                labels: { colors: 'var(--chart-foreground)' },
                markers: { size: 8 }
            }
        });
    }
    
}
    