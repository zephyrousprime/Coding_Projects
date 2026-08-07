import { mon_names, getCSSVariable } from './universal.js';

// Helper function to get CSS variable values


export class ChartJS {
    constructor() {
        this.christmasCount = 0;
        this.easterCount = 0;

        const canvas = document.getElementById('myChart');
        if (!canvas) return;
        this.ctx = canvas.getContext('2d');
    }
    #createDoughnutChart(labels, data, titleText, subtitleText, colors, cutout = '60%') {
        new Chart(this.ctx, {
            type: 'doughnut',
            data: {
                labels,
                datasets: [{
                    data,
                    backgroundColor: colors,
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
                    legend: {
                        position: 'bottom',
                        labels: { color: getCSSVariable('--chart-foreground'), usePointStyle: true, pointStyle: 'rectRounded', padding: 14, font: { size: 12 } }
                    },
                    title: {
                        display: true,
                        text: titleText,
                        color: getCSSVariable('--chart-foreground'),
                        font: { size: 18, weight: 600 },
                        padding: { bottom: 6 }
                    },
                    subtitle: {
                        display: true,
                        text: subtitleText,
                        color: getCSSVariable('--chart-muted'),
                        font: { size: 13 },
                        padding: { bottom: 16 }
                    },
                    tooltip: {
                        backgroundColor: getCSSVariable('--chartjs-tooltip-background'),
                        borderColor: getCSSVariable('--chartjs-tooltip-border-color'),
                        borderWidth: 1,
                        titleColor: getCSSVariable('--chart-foreground'),
                        bodyColor: getCSSVariable('--chart-foreground'),
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
        processedData.forEach(record => {
            if (record['Christmas Period'] === 'Yes') this.christmasCount++;
            if (record['Easter Period'] === 'Yes') this.easterCount++;
        });
        const colors = [
            getCSSVariable('--chart-lime'),
            getCSSVariable('--chart-coral')
        ];
        this.#createDoughnutChart(
            ['Christmas', 'Easter'],
            [this.christmasCount, this.easterCount],
            'Is Christmas more dangerous than Easter?',
            'Fatal crashes during the Christmas and Easter periods',
            colors,
            '62%'
        );
    }

    
}