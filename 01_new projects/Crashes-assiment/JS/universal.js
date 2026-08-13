import { ChartJS } from './chartjs.js';
import { ApexCharts } from './apex.js';
export const mon_names = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
const dayOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
export const titlesar = [{
    que1: [
        {
            text: "What is the most dangerous day of the week to drive?", 
            style: {fontSize: '18px'}
        },
        {
            text: "Fatal crashes by day of the week (columns) with share of all crashes (line)",
            style: { color: 'var(--chart-muted)',
            fontSize: '13px' } 
        }, 
        ['var(--chart-lime)', 'var(--chart-amber)'
        ], 
        { bar: { columnWidth: '55%', borderRadius: 6 } 
        },
        { width: [0, 3], curve: 'smooth' 
        }, 
        {
            size: 5,
            colors: ['var(--chart-amber)'],
            strokeColors: 'var(--chart-card)',
            strokeWidth: 2
        },
        {
            dayOrder,
            axisBorder: { color: 'var(--chart-grid)' },
            axisTicks: { color: 'var(--chart-grid)' },
            labels: { style: { colors: 'var(--chart-muted)' } }
        },
        {
                    title: { text: 'Fatal crashes', style: { color: 'var(--chart-muted)' } },
                    labels: { style: { colors: 'var(--chart-muted)' } }
        },
        {
                    opposite: true,
                    min: 0,
                   // max: Math.max(...sharePct) + 2,
                    title: { text: 'Share of crashes (%)', style: { color: 'var(--chart-muted)' } },
                    labels: { formatter: value => value + '%', style: { colors: 'var(--chart-muted)' } }
        }
    ]
}];
export function getCSSVariable(varName) {
    return getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
}
export function fetchData(htmlFile) {
    fetch('./Data/Fatal Crashes.json')
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
                    apchart.Que4(data);
                    break;
                case 'index.html':
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