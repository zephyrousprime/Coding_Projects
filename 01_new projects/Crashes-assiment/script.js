import { mon_names, chart_theme, fetchData  } from './JS/universal.js';
import { ChartJS } from './JS/chartjs.js';
import { ApexCharts } from './JS/apex.js';
/* 
• What is the most dangerous day of the week to drive? -- ApexCharts -- Que1
• Is Christmas more dangerous than Easter? -- ChartJS -- Que2
• Are fatalities reducing over time? -- ApexCharts -- Que3
• Should I ride a motorbike? -- ChartJS -- Que4
*/


document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('nav div div div div div ul li a');

    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    switch (currentPage) {
        case 'index.html':
            fetchData('index.html');
            break;
        case 'qu12.html':
            fetchData('qu12.html');
            break;
        case 'qu34.html':
            fetchData('qu34.html');
            break;
        case 'over-qu.html':
            fetchData('over-qu.html');
            break;
    }

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
