const bread = document.getElementById('bread');
const title = document.getElementById('title');
const soup = document.getElementById('soup'); 
const book = document.getElementById('book');

if (bread && soup && book && title) {
    title.style.margin = 'px';
    title.textContent = "World Hunger";
    bread.addEventListener('mouseover', function() {
        setTitleAnimated("What Is The Problem<br> With World Hunger?");
        title.style.margin = '11px';
    });
    bread.addEventListener('mouseout', function() {
        title.textContent = "World Hunger";
    });
    soup.addEventListener('mouseover', function() {
        setTitleAnimated("How Should We <br> Solve World Hunger?");
        title.style.margin = '11px';
    });
    soup.addEventListener('mouseout', function() {
        title.textContent = "World Hunger";
    });
    book.addEventListener('mouseover', function() {
        setTitleAnimated("Bibliography");
        title.style.margin = '11px';
    });
    book.addEventListener('mouseout', function() {
        title.textContent = "World Hunger"; 
    });
    function setTitleAnimated(newText) {
        title.innerHTML = newText;
        title.classList.add('animate-title');
        title.addEventListener('animationend', function handler() {
            title.classList.remove('animate-title');
            title.removeEventListener('animationend', handler);
            title.style.color = 'hsl(28, 93%, 49%)';
            title.style.margin = '0px';
        });
    }
    document.addEventListener("DOMContentLoaded", () => {
        const cards = document.querySelectorAll(".card");
        const revealOnScroll = () => {
            cards.forEach(card => {
                const rect = card.getBoundingClientRect();
                if (rect.top < window.innerHeight - 50) {
                    card.classList.add("visible");
                }
            });
        };
        window.addEventListener("scroll", revealOnScroll);
        revealOnScroll();
    });
}
