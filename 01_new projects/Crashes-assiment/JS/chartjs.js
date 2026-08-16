import { mon_names, getCSSVariable} from './universal.js'; 
import { titlesar } from './titlearhome.js';


export class ChartJS {
    constructor() {
        this.christmasCount = 0;
        this.easterCount = 0;
        const canvas = document.getElementById('myChart');
        if (!canvas) return;
        this.ctx = canvas.getContext('2d');
    }
    #createDoughnutChart( cutout = '60%') {
        new Chart(this.ctx, {
            type: 'doughnut',
            data: {
                labels: ['Christmas', 'Easter'],
                datasets: [{
                    data: [this.christmasCount, this.easterCount],
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
                    title: titlesar[0].que2[1],
                    subtitle: titlesar[0].que2[2],
                    tooltip: titlesar[0].que2[3],
                }
            }
        });
    }

    Que2(processedData) {
        processedData.forEach(record => {
            if (record['Christmas Period'] === 'Yes') this.christmasCount++;
            if (record['Easter Period'] === 'Yes') this.easterCount++;
        });
        this.#createDoughnutChart('62%');
    }

    
}