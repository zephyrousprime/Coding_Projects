    import { mon_names, getCSSVariable, titlesar, groupedarry } from './titlearhome.js';

    const cfg = titlesar[0];

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
            this.quePrompts = {};
        }

        #createBaseOptions() {
            return groupedarry[0].grouped[0];
        }

        Que1(processedData) {
            const dayOrder = cfg.que1[6].dayOrder;
            const counts = {};

            processedData.forEach(record => {
                const day = record['Dayweek'];
                if (day) counts[day] = (counts[day] || 0) + 1;
            });

            const categories = dayOrder.filter(day => counts[day] !== undefined);
            const crashTotals = categories.map(day => counts[day]);
            const grandTotal = crashTotals.reduce((a, b) => a + b, 0);
            const sharePct = crashTotals.map(total => +((total / grandTotal) * 100).toFixed(1));

            const monthByDay = {};
            processedData.forEach(record => {
                const day = record['Dayweek'];
                const month = record['Month'];
                if (!day || !month) return;
                if (!monthByDay[day]) monthByDay[day] = new Array(12).fill(0);
                monthByDay[day][month - 1]++;
            });

            createApexChart('#que1', {
                ...this.#createBaseOptions(),
                chart: {
                    ...this.#createBaseOptions().chart,
                    type: 'line',
                    height: 400,
                    events: {
                        dataPointSelection: (event, chartContext, config) => {
                            const day = categories[config.dataPointIndex];
                            if (!day) return;
                            this.renderDayDetail(day, monthByDay[day]);
                        }
                    }
                },
                colors: cfg.que1[2],
                title: cfg.que1[0],
                subtitle: cfg.que1[1],
                series: [
                    { name: 'Road deaths', type: 'column', data: crashTotals },
                    { name: 'Share of deaths (%)', type: 'line', data: sharePct }
                ],
                plotOptions: cfg.que1[3],
                stroke: cfg.que1[4],
                markers: cfg.que1[5],
                xaxis: { ...this.#createBaseOptions().xaxis, categories },
                yaxis: [cfg.que1[7], cfg.que1[8]],
                tooltip: {
                    theme: 'dark',
                    shared: true,
                    intersect: false,
                    style: { fontSize: '13px' },
                    y: {
                        formatter: value => Number.isInteger(value) ? value.toLocaleString() : value + '%'
                    }
                },
                legend: cfg.que1[9]
            });

            const dayLabels = categories.map((d, i) => `${d}: ${crashTotals[i]} (${sharePct[i]}%)`);
            const maxIdx = sharePct.indexOf(Math.max(...sharePct));
            this.quePrompts.que1 = `You are analysing Australian road death data. Road deaths by day of the week: ${dayLabels.join(', ')}. The most dangerous day is ${categories[maxIdx]} with ${sharePct[maxIdx]}% of all road deaths. Write a 5-6 sentence analysis explaining what the data reveals about road death risk by day of week. Note that the data does not account for traffic volume or kilometres travelled, so we cannot determine individual driving risk. Be specific with numbers and do not use bolding or italics.`;
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
                colors: cfg.renderday[0],
                title: {
                    text: `Road deaths on ${day}`,
                    style: { color: 'var(--chart-foreground)', fontSize: '16px', fontWeight: 600 }
                },
                subtitle: {
                    text: `${total.toLocaleString()} deaths — click a day in the chart above to change`,
                    style: { color: 'var(--chart-muted)', fontSize: '12px' }
                },
                series: [{ name: 'Road deaths', data: monthly }],
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

            createApexChart('#que3', {
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

                            this.monthChart.updateSeries([{ name: `Road deaths in ${year}`, data: yearMonthData[year] }], true);
                            this.monthChart.updateOptions({
                                subtitle: {
                                    text: `Monthly road deaths in ${year}`,
                                    style: { color: getCSSVariable('--chart-muted'), fontSize: '13px' }
                                }
                            });
                        }
                    }
                },
                colors: cfg.que3[2],
                title: cfg.que3[0],
                subtitle: cfg.que3[1],
                series: [{ name: 'Road deaths', data: yearTotals }],
                stroke: cfg.que3[3],
                markers: cfg.que3[4],
                fill: cfg.que3[5],
                xaxis: { ...baseOptions.xaxis, categories: years }
            });

            this.monthChart = createApexChart('#que3-month', {
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
                                if (!this.monthChart) return;
                                this.monthChart.updateSeries([{ name: 'Road deaths (all years)', data: monthlyTotals }], true);
                                this.monthChart.updateOptions({ subtitle: cfg.que3[7] });
                            }
                        }]
                    }
                },
                colors: cfg.que3[9],
                title: cfg.que3[6],
                subtitle: cfg.que3[7],
                series: [{ name: 'Road deaths (all years)', data: monthlyTotals }],
                plotOptions: cfg.que3[8],
                xaxis: { ...baseOptions.xaxis, categories: mon_names }
            });

            const yearSummary = years.map((y, i) => `${y}: ${yearTotals[i]}`).join(', ');
            const monthSummary = mon_names.map((m, i) => `${m}: ${monthlyTotals[i]}`).join(', ');
            this.quePrompts.que3 = `You are analysing Australian road death data over time. Yearly totals: ${yearSummary}. Monthly totals across all years: ${monthSummary}. The data shows whether road deaths are increasing or decreasing over time, and seasonal patterns. Note that the dataset does not account for population growth or changes in traffic volume, so trends in the data may not reflect changes in actual risk. Write a 5-6 sentence analysis about trends and seasonal patterns. Be specific with numbers and do not use bolding or italics.`;
        }

        Que4(processedData) {
            const counts = {};

            processedData.forEach(record => {
                const roadUser = record['Road User'];
                if (roadUser) counts[roadUser] = (counts[roadUser] || 0) + 1;
            });

            const count = (x) => counts[x] || 0;
            const leaf = (x) => ({ x, y: count(x) });
            const data = [
                { x: 'Car', children: [leaf('Driver'), leaf('Passenger')] },
                { x: 'Motorbike', y: count('Motorcycle rider') },
                { x: 'Other', children: [leaf('Pedestrian'), leaf('Pedal cyclist')] }
            ];
            data[0].y = count('Driver') + count('Passenger');
            data[2].y = count('Pedestrian') + count('Pedal cyclist');

            createApexChart('#que4', {
                ...this.#createBaseOptions(),
                chart: {
                    ...this.#createBaseOptions().chart,
                    type: 'sunburst',
                    height: 460
                },
                colors: cfg.que4[0],
                title: cfg.que4[1],
                subtitle: cfg.que4[2],
                series: [{ data }],
                stroke: cfg.que4[3],
                plotOptions: cfg.que4[4],
                dataLabels: cfg.que4[5],
                tooltip: {
                    theme: 'dark',
                    style: { fontSize: '13px' },
                    y: { formatter: value => value.toLocaleString() }
                },
                legend: cfg.que4[6]
            });

            const roadUserSummary = Object.entries(counts).sort((a, b) => b[1] - a[1]).map(([k, v]) => `${k}: ${v}`).join(', ');
            this.quePrompts.que4 = `You are analysing Australian road death data by road user type. The breakdown: ${roadUserSummary}. Car occupants (drivers + passengers) total ${data[0].y}, motorcycle riders ${count('Motorcycle rider')}, pedestrians ${count('Pedestrian')}, pedal cyclists ${count('Pedal cyclist')}. Note that this dataset does not include the number of people using each road type or kilometres travelled, so we cannot determine whether any road user type is disproportionately dangerous — only their share of recorded deaths. Write a 5-6 sentence analysis about which road users account for the most deaths and what this means for road safety. Be specific with numbers and do not use bolding or italics.`;
        }

        QueOver(processedData) {
            const stateCounts = {};
            const crashByYear = {};

            processedData.forEach(record => {
                const state = record['State'];
                const year = record['Year'];
                if (state) stateCounts[state] = (stateCounts[state] || 0) + 1;
                if (year) crashByYear[year] = (crashByYear[year] || 0) + 1;
            });

            const stateOrder = cfg.stateOrder;
            const categories = stateOrder.filter(s => stateCounts[s]);
            const totals = categories.map(s => stateCounts[s]);
            const labels = categories.map(s => cfg.stateNames[s] || s);
            const grandTotal = totals.reduce((a, b) => a + b, 0);

            createApexChart('#over-qu-chart', {
                ...this.#createBaseOptions(),
                chart: {
                    ...this.#createBaseOptions().chart,
                    type: 'bar',
                    height: 380
                },
                colors: ['var(--chart-teal)'],
                title: cfg.overQuChartTitle.title,
                subtitle: {
                    text: `${grandTotal.toLocaleString()} total road deaths across Australia`,
                    style: cfg.overQuAnswer[2]
                },
                series: [{ name: 'Road deaths', data: totals }],
                plotOptions: cfg.overQuAnswer[3],
                stroke: { width: 0 },
                markers: { size: 0 },
                xaxis: {
                    categories: labels,
                    ...this.#createBaseOptions().xaxis,
                    labels: cfg.overQuAnswer[4]
                },
                yaxis: cfg.overQuAnswer[5],
                dataLabels: {
                    enabled: true,
                    formatter: val => val.toLocaleString(),
                    style: cfg.overQuAnswer[6]
                },
                tooltip: {
                    theme: 'dark',
                    style: { fontSize: '13px' },
                    y: { formatter: val => val.toLocaleString() }
                },
                legend: { show: false }
            });

            const stateSummary = categories.map((s, i) => `${cfg.stateNames[s] || s}: ${totals[i]}`).join(', ');
            const years = Object.keys(crashByYear).sort();

            const tableContainer = document.querySelector('#over-qu-table');
            if (tableContainer) {
                tableContainer.innerHTML = '<p class="pop-table-loading">Loading population data...</p>';
            }

            fetch('https://api.worldbank.org/v2/country/AUS/indicator/SP.POP.TOTL?date=1989:2023&format=json&per_page=50')
                .then(r => r.json())
                .then(json => {
                    const popData = {};
                    json[1].forEach(item => {
                        if (item.value) popData[item.date] = item.value;
                    });

                    let html = '<h3 class="pop-table-title">Road deaths vs population (1989–2023)</h3>';
                    html += '<div class="pop-table-wrap"><table class="pop-table-table">';
                    html += '<thead><tr><th>Year</th><th>Population</th><th>Road deaths</th><th>Rate per 100k</th></tr></thead>';
                    html += '<tbody>';

                    years.forEach(year => {
                        const pop = popData[year];
                        const crashes = crashByYear[year];
                        const rate = pop ? ((crashes / pop) * 100000).toFixed(2) : '—';
                        const popStr = pop ? pop.toLocaleString() : '—';
                        html += `<tr><td>${year}</td><td>${popStr}</td><td>${crashes.toLocaleString()}</td><td>${rate}</td></tr>`;
                    });

                    html += '</tbody></table></div>';
                    if (tableContainer) tableContainer.innerHTML = html;

                    const yearRateLabels = years.map(y => {
                        const pop = popData[y];
                        const rate = pop ? ((crashByYear[y] / pop) * 100000).toFixed(2) : 'N/A';
                        return `${y}: ${rate}/100k`;
                    });

                    const maxIdx = totals.indexOf(Math.max(...totals));
                    const minIdx = totals.indexOf(Math.min(...totals));
                    this.quePrompts['over-qu'] = `You are analysing Australian road death data (${grandTotal.toLocaleString()} records) to answer "How safe are our roads?". Road deaths by state: ${stateSummary}. Road death rate per 100,000 population over time: ${yearRateLabels.join(', ')}. ${cfg.stateNames[categories[maxIdx]] || categories[maxIdx]} has the highest with ${Math.max(...totals).toLocaleString()} deaths, while ${cfg.stateNames[categories[minIdx]] || categories[minIdx]} has the fewest with ${Math.min(...totals).toLocaleString()}. Note that the dataset does not account for traffic volume, vehicle kilometres travelled, or changes in road infrastructure over time. Write a 6-8 sentence synthesis answering how safe Australian roads are, covering geographic distribution, whether the rate is declining relative to population growth, and when roads are most dangerous. Be specific with numbers and conclude with actionable insights.`;
                })
                .catch(() => {
                    if (tableContainer) tableContainer.innerHTML = '<p class="pop-table-loading">Population data unavailable.</p>';
                    const maxIdx = totals.indexOf(Math.max(...totals));
                    const minIdx = totals.indexOf(Math.min(...totals));
                    this.quePrompts['over-qu'] = `You are analysing Australian road death data (${grandTotal.toLocaleString()} records) to answer "How safe are our roads?". Road deaths by state: ${stateSummary}. ${cfg.stateNames[categories[maxIdx]] || categories[maxIdx]} has the highest with ${Math.max(...totals).toLocaleString()} deaths, while ${cfg.stateNames[categories[minIdx]] || categories[minIdx]} has the fewest with ${Math.min(...totals).toLocaleString()}. Note that the dataset does not account for traffic volume or vehicle kilometres travelled. Write a 6-8 sentence synthesis answering how safe Australian roads are, covering geographic distribution, when roads are most dangerous, and which road users are most affected. Be specific with numbers and conclude with actionable insights.`;
                });
        }
    }
