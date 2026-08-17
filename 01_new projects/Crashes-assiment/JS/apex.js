import { mon_names, getCSSVariable} from './universal.js';
import { titlesar } from './titlearhome.js';

const chartRegistry = new Map();

function createApexChart(selector, options) {
    const container = document.querySelector(selector);
    if (!container) return null;
    const chart = new window.ApexCharts(container, options);
    chart.render();
    chartRegistry.set(selector, { chart, options });
    return chart;
}

function getChart(selector) {
    return chartRegistry.get(selector)?.chart ?? null;
}

window.addEventListener('themechange', () => {
    chartRegistry.forEach(({ chart, options }, selector) => {
        const container = document.querySelector(selector);
        if (!container) return;
        chart.destroy();
        const fresh = new window.ApexCharts(container, options);
        fresh.render();
        chartRegistry.set(selector, { chart: fresh, options });
    });
});

const detailClose = document.querySelector('#que1-detail-close');
detailClose?.addEventListener('click', () => {
    const detail = getChart('#que1-detail');
    if (detail) detail.destroy();
    chartRegistry.delete('#que1-detail');
    document.querySelector('#que1-detail-wrap')?.classList.add('is-hidden');
});

export class ApexCharts {
    constructor() {
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

        const byDayMonth = {};
        categories.forEach(day => { byDayMonth[day] = new Array(12).fill(0); });
        processedData.forEach(record => {
            const day = record['Dayweek'];
            const month = record['Month'];
            if (day && month && byDayMonth[day]) byDayMonth[day][month - 1]++;
        });

        createApexChart('#que1-chart', {
            ...this.#createBaseOptions(),
            chart: {
                ...this.#createBaseOptions().chart,
                type: 'line',
                height: 400,
                events: {
                    dataPointSelection: (event, chartContext, config) => {
                        const day = categories[config.dataPointIndex];
                        if (!day) return;
                        this.renderDayDetail(day, byDayMonth[day]);
                    }
                }
            },
            colors: titlesar[0].que1[2],
            title: titlesar[0].que1[0],
            subtitle: titlesar[0].que1[1],
            series: [
                { name: 'Fatal crashes', type: 'column', data: crashTotals },
                { name: 'Share of crashes (%)', type: 'line', data: sharePct }
            ],
            plotOptions: titlesar[0].que1[3],
            stroke: titlesar[0].que1[4],
            markers: titlesar[0].que1[5],
            xaxis: { categories: dayOrder},
            yaxis: [titlesar[0].que1[7], titlesar[0].que1[8]],
            tooltip: {
                theme: 'dark',
                shared: true,
                intersect: false,
                style: { fontSize: '13px' },
                y: {
                    formatter: value => Number.isInteger(value) ? value.toLocaleString() : value + '%'
                }
            },
            legend: titlesar[0].que1[9]
        });
         const dayLabels = categories.map((d, i) => `${d}: ${crashTotals[i]} (${sharePct[i]}%)`);
    this.quePrompts = this.quePrompts || {};
    this.quePrompts.que1 = `You are analysing Australian fatal crash data (54,641 records). The data shows fatal crashes by day of the week: ${dayLabels.join(', ')}. The most dangerous day is ${categories[sharePct.indexOf(Math.max(...sharePct))]} with ${Math.max(...sharePct)}% of all fatal crashes. Write a 5-6 sentence analysis explaining what the data reveals about driving danger by day of week. Be specific with numbers.`;
    }

    renderDayDetail(day, monthly) {
        const selector = '#que1-detail';
        const container = document.querySelector(selector);
        const wrapper = document.querySelector('#que1-detail-wrap');
        if (!container || !wrapper) return;

        const existing = getChart(selector);
        if (existing) existing.destroy();

        wrapper.classList.remove('is-hidden');
        const total = monthly.reduce((a, b) => a + b, 0);

        createApexChart(selector, {
            ...this.#createBaseOptions(),
            chart: {
                ...this.#createBaseOptions().chart,
                type: 'bar',
                height: 280
            },
            colors: ['var(--chart-amber)'],
            title: {
                text: `Fatal crashes on ${day}`,
                style: { color: 'var(--chart-foreground)', fontSize: '16px', fontWeight: 600 }
            },
            subtitle: {
                text: `${total.toLocaleString()} crashes — click a day in the chart above to change`,
                style: { color: 'var(--chart-muted)', fontSize: '12px' }
            },
            series: [{ name: 'Fatal crashes', data: monthly }],
            plotOptions: { bar: { columnWidth: '55%', borderRadius: 6 } },
            xaxis: { ...this.#createBaseOptions().xaxis, categories: mon_names },
            tooltip: {
                theme: 'dark',
                style: { fontSize: '13px' },
                y: { formatter: value => value.toLocaleString() }
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
                        const monthChart = getChart('#que3-month');
                        if (!year || !monthChart) return;

                        monthChart.updateSeries([{ name: `Fatal crashes in ${year}`, data: yearMonthData[year] }], true);
                        monthChart.updateOptions({
                            subtitle: {
                                text: `Monthly fatal crashes in ${year}`,
                                style: { color: 'var(--chart-muted)', fontSize: '13px' }
                            }
                        });
                    }
                }
            },
            colors: titlesar[0].que3[2],
            title: titlesar[0].que3[0],
            subtitle: titlesar[0].que3[1],
            series: [{ name: 'Fatal crashes', data: yearTotals }],
            stroke: titlesar[0].que3[3],
            markers: titlesar[0].que3[4],
            fill: titlesar[0].que3[5],
            xaxis: { ...baseOptions.xaxis, categories: years }
        });

        createApexChart('#que3-month', {
            ...baseOptions,
            chart: {
                ...baseOptions.chart,
                id: 'q3-month',
                type: 'bar',
                height: 320,
                toolbar: {
                    ...baseOptions.chart.toolbar,
                    customIcons: [{
                        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>',
                        index: 0,
                        title: 'Show all years',
                        click: () => {
                            const monthChart = getChart('#que3-month');
                            if (!monthChart) return;
                            monthChart.updateSeries([{ name: 'Fatal crashes (all years)', data: monthlyTotals }], true);
                            monthChart.updateOptions({ subtitle: titlesar[0].que3[7] });
                        }
                    }]
                },
                animations: {
                    enabled: true,
                    easing: 'easeinout',
                    speed: 800,
                    animateGradually: { enabled: true },
                    dynamicAnimation: { enabled: true, speed: 800 }
                }
            },
            colors: titlesar[0].que3[9],
            title: titlesar[0].que3[6],
            subtitle: titlesar[0].que3[7],
            series: [{ name: 'Fatal crashes (all years)', data: monthlyTotals }],
            plotOptions: titlesar[0].que3[8],
            xaxis: { ...baseOptions.xaxis, categories: mon_names }
        });
         const yearSummary = years.map((y, i) => `${y}: ${yearTotals[i]}`).join(', ');
    const monthSummary = mon_names.map((m, i) => `${m}: ${monthlyTotals[i]}`).join(', ');
    this.quePrompts = this.quePrompts || {};
    this.quePrompts.que3 = `You are analysing Australian fatal crash data (54,641 records) over time. Yearly totals: ${yearSummary}. Monthly totals across all years: ${monthSummary}. The data shows whether fatalities are increasing or decreasing over time, and seasonal patterns. Write a 5-6 sentence analysis about trends and seasonal patterns. Be specific with numbers.`;

    }

    Que4(processedData) {
        const counts = {};
        processedData.forEach(record => {
            const user = record['Road User'];
            if (user) counts[user] = (counts[user] || 0) + 1;
        });

        const leaf = (x) => ({ x, y: counts[x] || 0 });
        const count = (x) => counts[x] || 0;
        const data = [
            {
                x: 'Car',
                children: [leaf('Driver'), leaf('Passenger')]
            },
            { x: 'Motorbike', y: count('Motorcycle rider') },
            {
                x: 'Other',
                children: [leaf('Pedestrian'), leaf('Pedal cyclist')]
            }
        ];
        data[0].y = count('Driver') + count('Passenger');
        data[2].y = count('Pedestrian') + count('Pedal cyclist');

        createApexChart('#que4-chart', {
            ...this.#createBaseOptions(),
            chart: {
                ...this.#createBaseOptions().chart,
                type: 'sunburst',
                height: 460
            },
            colors: titlesar[0].que4[0],
            title: titlesar[0].que4[1],
            subtitle: titlesar[0].que4[2],
            series: [{ data }],
            stroke: titlesar[0].que4[3],
            plotOptions: titlesar[0].que4[4],
            dataLabels: titlesar[0].que4[5],
            tooltip: {
                theme: 'dark',
                style: { fontSize: '13px' },
                y: { formatter: value => value.toLocaleString() }
            },
            legend: titlesar[0].que4[6]
            

        });
    const roadUserSummary = Object.entries(counts).sort((a, b) => b[1] - a[1]).map(([k, v]) => `${k}: ${v}`).join(', ');
        this.quePrompts = this.quePrompts || {};
        this.quePrompts.que4 = `You are analysing Australian fatal crash data (54,641 records) by road user type. The breakdown: ${roadUserSummary}. Car occupants (drivers + passengers) total ${data[0].y}, motorcycle riders ${count('Motorcycle rider')}, pedestrians ${count('Pedestrian')}, pedal cyclists ${count('Pedal cyclist')}. Write a 5-6 sentence analysis about which road users are most at risk and what this means for road safety. Be specific with numbers.`;
    }
}
    