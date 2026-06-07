document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('.main-nav a');
    const path = location.pathname.split('/').pop() || 'index.html';
    links.forEach(a => {
        if (a.getAttribute('href') === path) {
            a.classList.add('active');
            a.style.background = 'rgba(255,255,255,0.06)';
        }
    });
});