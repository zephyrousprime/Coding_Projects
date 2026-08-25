import { mon_names, getCSSVariable, titlesar } from './titlearhome.js';
import { ChartJS } from './chartjs.js';
import { ApexCharts } from './apex.js';
import { initAI } from './ai.js';

export { mon_names, getCSSVariable };

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
                case 'over-qu.html':
                    apchart.QueOver(data);
                    break;
                case 'index.html':
                    break;
                default:
                    console.error('Unknown HTML file:', htmlFile);
            }
            initAI(() => ({
                que1: apchart.quePrompts?.que1,
                que2: chartjs.quePrompts?.que2,
                que3: apchart.quePrompts?.que3,
                que4: apchart.quePrompts?.que4,
                'over-qu': apchart.quePrompts?.['over-qu']
            }));
        })
        .catch(error => console.error('Error fetching data:', error));
}
