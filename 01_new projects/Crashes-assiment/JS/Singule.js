const titleEl = document.getElementById('changing-title');
const linkEl = document.getElementById('changing-herf');
const cards = document.querySelectorAll('.multiple-choice');

cards.forEach(card => {
    card.addEventListener('click', () => {
        const page = card.dataset.page;
        const title = card.dataset.title;
        if (!page || !title) return;

        linkEl.href = page;

        if (titleEl.textContent === title) {
            window.location.href = page;
            return;
        }

        titleEl.dispatchEvent(new CustomEvent('titlechange', { detail: 'Go To '+ title, bubbles: true }));
    });
});

linkEl.addEventListener('click', (e) => {
    const href = linkEl.getAttribute('href');
    if (!href || href === '') {
        e.preventDefault();
    }
});
