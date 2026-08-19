import { mon_names, getCSSVariable, titlesar } from './titlearhome.js';

const cfg = titlesar[0];
const instances = [];
window.addEventListener('themechange', () => {
    instances.forEach(instance => instance.refresh());
});

export class ChartJS {
    constructor() {
        this.christmasCount = 0;
        this.easterCount = 0;
        this.christmasMonths = new Array(12).fill(0);
        this.easterMonths = new Array(12).fill(0);
        this.chart = null;
        this.drilled = false;
        this.drilledLabel = '';
        this.quePrompts = {};
        const canvas = document.getElementById('myChart');
        if (!canvas) return;
        this.ctx = canvas.getContext('2d');
        instances.push(this);
    }

    #createDoughnutChart(cutout = '62%') {
        if (!this.ctx) return;
        const labels = this.drilled ? mon_names : ['Christmas', 'Easter'];
        const data = this.drilled
            ? (this.drilledLabel === 'Christmas' ? this.christmasMonths : this.easterMonths)
            : [this.christmasCount, this.easterCount];
        const title = this.drilled
            ? { ...cfg.que2[1], text: `Fatal crashes during the ${this.drilledLabel} period, by month` }
            : cfg.que2[1];
        const subtitle = this.drilled
            ? { display: true, text: 'Click a slice to return to Christmas vs Easter', color: getCSSVariable('--chart-muted'), font: { size: 13 } }
            : cfg.que2[2];

        this.chart = new Chart(this.ctx, {
            type: 'doughnut',
            data: {
                labels,
                datasets: [{
                    data,
                    backgroundColor: cfg.que2[4],
                    borderColor: getCSSVariable('--chart-card'),
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
                    legend: cfg.que2[0],
                    title,
                    subtitle,
                    tooltip: cfg.que2[3],
                },
                onClick: (event, elements, chart) => {
                    if (!elements.length) return;
                    const index = elements[0].index;
                    if (this.drilled) {
                        this.drilled = false;
                        this.drilledLabel = '';
                        chart.data.labels = ['Christmas', 'Easter'];
                        chart.data.datasets[0].data = [this.christmasCount, this.easterCount];
                        chart.options.plugins.title = cfg.que2[1];
                        chart.options.plugins.subtitle = cfg.que2[2];
                        chart.update();
                    } else {
                        const label = chart.data.labels[index];
                        this.drilled = true;
                        this.drilledLabel = label;
                        chart.data.labels = mon_names;
                        chart.data.datasets[0].data = label === 'Christmas' ? this.christmasMonths : this.easterMonths;
                        chart.options.plugins.title = { ...cfg.que2[1], text: `Fatal crashes during the ${label} period, by month` };
                        chart.options.plugins.subtitle = { display: true, text: 'Click a slice to return to Christmas vs Easter', color: getCSSVariable('--chart-muted'), font: { size: 13 } };
                        chart.update();
                    }
                }
            }
        });
    }

    Que2(processedData) {
        processedData.forEach(record => {
            if (record['Christmas Period'] === 'Yes') this.christmasCount++;
            if (record['Easter Period'] === 'Yes') this.easterCount++;

            const month = record['Month'];
            if (!month) return;
            if (record['Christmas Period'] === 'Yes') this.christmasMonths[month - 1]++;
            if (record['Easter Period'] === 'Yes') this.easterMonths[month - 1]++;
        });

        this.#createDoughnutChart();

        const christmasMonthly = mon_names.map((m, i) =>
            this.christmasMonths[i] ? `${m} ${this.christmasMonths[i]}` : '').filter(Boolean).join(', ');
        const easterMonthly = mon_names.map((m, i) =>
            this.easterMonths[i] ? `${m} ${this.easterMonths[i]}` : '').filter(Boolean).join(', ');

        this.quePrompts.que2 = `You are analysing Australian fatal crash data comparing Christmas and Easter holiday periods. The Christmas period has ${this.christmasCount.toLocaleString()} fatal crashes while Easter has ${this.easterCount.toLocaleString()} — Christmas has ${((this.christmasCount / this.easterCount) * 100 - 100).toFixed(0)}% more. Monthly breakdown — Christmas: ${christmasMonthly}. Easter: ${easterMonthly}. Write a 5-6 sentence analysis comparing the two holiday periods, explaining why Christmas is more dangerous and what the monthly patterns reveal. Be specific with numbers and do not use bolding or italics.`;
    }

    refresh() {
        if (!this.chart) return;
        this.chart.destroy();
        this.chart = null;
        this.#createDoughnutChart('62%');
    }
}
