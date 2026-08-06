import { mon_names, chart_theme  } from './universal.js';

export class ChartJS {
    constructor() {
        this.christmasCount = 0;
        this.easterCount = 0;
        this.motorbikeCount = 0;
        this.driverCount = 0;
        this.passengerCount = 0;
        this.pedestrianCount = 0;
        this.cyclistCount = 0;
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
        processedData.forEach(record => {
            if (record['Christmas Period'] === 'Yes') this.christmasCount++;
            if (record['Easter Period'] === 'Yes') this.easterCount++;
        });
        this.#createDoughnutChart(
            ['Christmas', 'Easter'],
            [this.christmasCount, this.easterCount],
            'Is Christmas more dangerous than Easter?',
            'Fatal crashes during the Christmas and Easter periods',
            [chart_theme.lime, chart_theme.coral],
            '62%'
        );
    }

    Que4(processedData) {
       let arry1 = {
        'Motorcycle rider': [this.motorbikeCount],
        'Driver': [this.driverCount],
        'Passenger': [this.passengerCount],
        'Pedestrian': [this.pedestrianCount],
        'Pedal cyclist': [this.cyclistCount]
       }
        processedData.forEach(record => {
            for(let i = 0; i < Object.keys(arry1).length; i++){
                if(record['Road User'] === Object.keys(arry1)[i]) {
                    arry1[Object.keys(arry1)[i]][0]++;
                }
            }
           
        });

        this.#createDoughnutChart(
            ['Motorcycle rider', 'Driver', 'Passenger', 'Pedestrian', 'Pedal cyclist'],
            [arry1['Motorcycle rider'][0], arry1['Driver'][0], arry1['Passenger'][0], arry1['Pedestrian'][0], arry1['Pedal cyclist'][0]],
            'Should I ride a motorbike?',
            'Fatal crashes by road user type',
            [chart_theme.amber, chart_theme.teal, chart_theme.blue, chart_theme.coral, chart_theme.green]
        );
    }
}