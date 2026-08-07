
const multipleChoice = document.querySelectorAll('.multiple-choice');
const changing = document.getElementById('changing-herf');
multipleChoice.forEach(choice => {
    choice.addEventListener('click', function(event) {
    const item = event.target.closest('.multiple-choice');
    if (!item || !item.id) return;
    changing.setAttribute('href', item.id + '.html');
    changing.classList.add('pointer');
    const showtohide = item.closest('.show-to-hide');
    if (showtohide.contains(id('changing-herf'))) {
        showtohide.classList.add('show-to-hide--hidden');
        setTimeout(() => {
            showtohide.classList.remove('show-to-hide--hidden');
        }, 300);
    }});
});