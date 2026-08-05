
function fetchData(htmlFile) {
    fetch('Fatal Crashes.json')
        .then(response => response.json())
        .then(data => {
            let processedData = data;
            // console.log(processedData);
            let apchart = new ApexCharts();
            let chartjs = new ChartJS();
            switch (htmlFile) {
                case 'qu12.html':
                    apchart.Que1(processedData);
                    chartjs.Que2(processedData);
                    break;
                case 'qu34.html':
                    apchart.Que3(processedData);
                    chartjs.Que4(processedData);
                    break;
                case 'over-qu.html':
                    // Call functions for over-qu.html
                    break;
                default:
                    console.error('Unknown HTML file:', htmlFile);
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }

/* 
• What is the most dangerous day of the week to drive? -- ApexCharts -- Que1
• Is Christmas more dangerous than Easter? -- ChartJS -- Que2
• Are fatalities reducing over time? -- ApexCharts -- Que3
• Should I ride a motorbike? -- ChartJS -- Que4
*/
class ApexCharts {
    Que1(processedData) {
        const dayOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        const dayIndex = processedData.fields.findIndex(field => field.id === 'Dayweek');
        const counts = {};

        processedData.records.forEach(record => {
            const day = record[dayIndex];
            if (day) counts[day] = (counts[day] || 0) + 1;
        });

        const categories = dayOrder.filter(day => counts[day] !== undefined);
        const seriesData = categories.map(day => counts[day]);

        new window.ApexCharts(document.querySelector('#que1-chart'), {
            chart: { type: 'bar', height: 350 },
            title: { text: 'Fatal crashes by day of the week' },
            series: [{ name: 'Fatal crashes', data: seriesData }],
            xaxis: { categories: categories }
        }).render();
    }
    Que3(processedData) {
        const yearIndex = processedData.fields.findIndex(field => field.id === 'Year');
        const counts = {};
        
        processedData.records.forEach(record => {
            const year = record[yearIndex];
            if (year) counts[year] = (counts[year] || 0) + 1;
        });

        const sortedYears = Object.keys(counts).sort();
        const seriesData = sortedYears.map(year => counts[year]);

        new window.ApexCharts(document.querySelector('#que3-chart'), {
            chart: { type: 'line', height: 350 },
            title: { text: 'Fatal crashes over time' },
            series: [{ name: 'Fatal crashes', data: seriesData }],
            xaxis: { categories: sortedYears }
        }).render();
    }
}
class ChartJS {
    Que2(processedData) {
        const christmasIndex = processedData.fields.findIndex(field => field.id === 'Christmas Period');
        const easterIndex = processedData.fields.findIndex(field => field.id === 'Easter Period');

        let christmasCount = 0;
        let easterCount = 0;

        processedData.records.forEach(record => {
            if (record[christmasIndex] === 'Yes') christmasCount++;
            if (record[easterIndex] === 'Yes') easterCount++;
        });

        const ctx = document.getElementById('myChart').getContext('2d');

        new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Christmas', 'Easter'],
                datasets: [{
                    label: 'Fatal crashes',
                    data: [christmasCount, easterCount],
                    borderWidth: 1,
                    backgroundColor: [
                        'rgba(255, 73, 39, 0.7)',
                        'rgba(54, 162, 255, 0.7)'
                    ],
                    borderColor: [
                        'orange',
                        'blue'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: true },
                    title: {
                        display: true,
                        text: 'Fatal crashes: Christmas vs Easter'
                    }
                }
            }
        });
    }
}
fetchData();
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('nav div div div div div ul li a');
    navLinks.forEach(link => {
        let currentUrl = window.location.href;
        let linkthatisdeadtomeandwanttodie = currentUrl.replace(link, '');
        const websitestripped = currentUrl.replace(linkthatisdeadtomeandwanttodie, '');
        switch (websitestripped) {
            case link.href:
                link.classList.add('active');
            case 'index.html':
                fetchData('index.html');
                break;
            case 'qu12.html':
                fetchData('qu12.html')
                break;
            case 'qu34.html':
                fetchData('qu34.html');
                break;
            case 'over-qu.html':
                fetchData('over-qu.html')
                break;
        }
    });

    const siteHeader = document.querySelector('.site-header');
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const dropdownBtns = document.querySelectorAll('.menu-btn[aria-expanded]');
    const backdrop = document.querySelector('.site-header-nav-backdrop');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            siteHeader.classList.toggle('site-header--mobile-open');
            mobileToggle.classList.toggle('mobile-menu-toggle--open');
            const isOpen = siteHeader.classList.contains('site-header--mobile-open');
            mobileToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
        });
    }

    dropdownBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const wasExpanded = btn.getAttribute('aria-expanded') === 'true';
            dropdownBtns.forEach(b => {
                b.setAttribute('aria-expanded', 'false');
                b.closest('li').classList.remove('site-header--expanded');
            });
            if (!wasExpanded) {
                btn.setAttribute('aria-expanded', 'true');
                btn.closest('li').classList.add('site-header--expanded');
                siteHeader.classList.add('site-header--expanded');
            } else {
                siteHeader.classList.remove('site-header--expanded');
            }
        });
    });

    if (backdrop) {
        backdrop.addEventListener('click', () => {
            dropdownBtns.forEach(b => {
                b.setAttribute('aria-expanded', 'false');
                b.closest('li').classList.remove('site-header--expanded');
            });
            siteHeader.classList.remove('site-header--expanded');
            siteHeader.classList.remove('site-header--mobile-open');
            if (mobileToggle) mobileToggle.classList.remove('mobile-menu-toggle--open');
        });
    }
});
