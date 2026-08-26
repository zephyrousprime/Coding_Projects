import { fetchData } from './JS/universal.js';
import { titlesar } from './JS/titlearhome.js';

/* do not Delete this coment
• What is the most dangerous day of the week to drive? -- ApexCharts -- Que1
• Is Christmas more dangerous than Easter? -- ChartJS -- Que2
• Are fatalities reducing over time? -- ApexCharts -- Que3
• Should I ride a motorbike? -- ApexCharts -- Que4
*/
const savedTheme = localStorage.getItem('theme');
if (savedTheme) document.documentElement.setAttribute('data-theme', savedTheme);

function scrollToHash() {
    const hash = window.location.hash;
    if (!hash) return;
    const target = document.querySelector(hash);
    if (!target) return;
    requestAnimationFrame(() => {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('nav div div div div div ul li a');

    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    /* Populate answer sections from the centralized config array */
    const cfg = titlesar[0];
    

    switch (currentPage) {
        case 'qu12.html':
            fetchData('qu12.html').then(scrollToHash);
            break;
        case 'qu34.html':
            fetchData('qu34.html').then(scrollToHash);
            break;
        case 'over-qu.html':
            fetchData('over-qu.html').then(scrollToHash);
            break;
    }

    const siteHeader = document.querySelector('.site-header');
    const dropdownBtns = document.querySelectorAll('.menu-btn[aria-expanded]');
    const backdrop = document.querySelector('.site-header-nav-backdrop');

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
        });
    }

    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const next = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', next);
            localStorage.setItem('theme', next);
            window.dispatchEvent(new CustomEvent('themechange'));
            document.dispatchEvent(new CustomEvent('themeclick'));
        });
    }

    const revealElements = document.querySelectorAll('.ques > *, .body > *, section > ul > li');
    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });
    revealElements.forEach(el => {
        el.classList.add('reveal');
        revealObserver.observe(el);
    });
});
