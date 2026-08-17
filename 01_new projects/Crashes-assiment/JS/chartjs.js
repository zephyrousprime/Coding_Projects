import { mon_names, getCSSVariable} from './universal.js';
import { titlesar } from './titlearhome.js';

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
            ? { ...titlesar[0].que2[1], text: `Fatal crashes during the ${this.drilledLabel} period, by month` }
            : titlesar[0].que2[1];
        const subtitle = this.drilled
            ? { display: true, text: 'Click a slice to return to Christmas vs Easter', color: getCSSVariable('--chart-muted'), font: { size: 13 } }
            : titlesar[0].que2[2];

        this.chart = new Chart(this.ctx, {
            type: 'doughnut',
            data: {
                labels,
                datasets: [{
                    data,
                    backgroundColor: titlesar[0].que2[4],
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
                    legend: titlesar[0].que2[0],
                    title,
                    subtitle,
                    tooltip: titlesar[0].que2[3],
                },
                onClick: (event, elements, chart) => {
                    if (!elements.length) return;
                    const index = elements[0].index;
                    if (this.drilled) {
                        this.drilled = false;
                        this.drilledLabel = '';
                        chart.data.labels = ['Christmas', 'Easter'];
                        chart.data.datasets[0].data = [this.christmasCount, this.easterCount];
                        chart.options.plugins.title = titlesar[0].que2[1];
                        chart.options.plugins.subtitle = titlesar[0].que2[2];
                        chart.update();
                    } else {
                        const label = chart.data.labels[index];
                        this.drilled = true;
                        this.drilledLabel = label;
                        chart.data.labels = mon_names;
                        chart.data.datasets[0].data = label === 'Christmas' ? this.christmasMonths : this.easterMonths;
                        chart.options.plugins.title = { ...titlesar[0].que2[1], text: `Fatal crashes during the ${label} period, by month` };
                        chart.options.plugins.subtitle = { display: true, text: 'Click a slice to return to Christmas vs Easter', color: getCSSVariable('--chart-muted'), font: { size: 13 } };
                        chart.update();
                    }
                }
            }
        });
    }

    Que2(processedData) {
        processedData.forEach(record => {
            const month = record['Month'];
            if (record['Christmas Period'] === 'Yes') {
                this.christmasCount++;
                if (month) this.christmasMonths[month - 1]++;
            }
            if (record['Easter Period'] === 'Yes') {
                this.easterCount++;
                if (month) this.easterMonths[month - 1]++;
            }
        });
        this.#createDoughnutChart('62%');
    }

    refresh() {
        if (!this.chart) return;
        this.chart.destroy();
        this.chart = null;
        this.#createDoughnutChart('62%');
    }
}
