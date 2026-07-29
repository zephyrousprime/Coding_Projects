






document.addEventListener('DOMContentLoaded', function() {
    /*const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        let currentUrl = window.location.href;
        let linkthatisdeadtomeandwanttodie = currentUrl.replace(link, '');
        const websitestripped = currentUrl.replace(linkthatisdeadtomeandwanttodie, '');
        if (link.href === websitestripped) {
            link.classList.add('active');
            }
    });
    */
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
