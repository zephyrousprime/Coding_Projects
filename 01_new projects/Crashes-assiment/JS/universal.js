import { ChartJS } from './chartjs.js';
import { ApexCharts } from './apex.js';
import { titlesar } from './titlearhome.js';
export const mon_names = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
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