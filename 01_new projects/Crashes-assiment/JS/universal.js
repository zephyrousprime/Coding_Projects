import { ChartJS } from './chartjs.js';
import { ApexCharts } from './apex.js';
export const mon_names = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];

export const chart_theme = {
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

export function fetchData(htmlFile) {
    fetch('./Fatal Crashes.json')
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