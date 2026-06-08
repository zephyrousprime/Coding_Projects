const chance = document.querySelector('.dinochance');
const dropsn = document.querySelector('.dinodrops');
const name = document.querySelector('.dinoname');
let input_number = 100;
const inputField = document.getElementById('input-number');

inputField.addEventListener('change', (event) => {
    input_number = event.target.value;
    fetchData('dino');
});
function displayStats(stats) {
    const tableData = stats.drops.map((drop, index) => ({
        id: index + 1,
        name: drop.name,
        theoretical_chance: `${drop.chance}%`,
        amount_received: drop.value,
        true_probability: `${(drop.value / input_number * 100).toFixed(0)}%`,
    }));
    table.setData(tableData);
}

function fetchData(value) {
    fetch(`${value}.json`)
        .then(response => response.json())
        .then(data => displayStats(data));
}

var table = new Tabulator("#example-table", {
    data: [],
    autoColumns: true,
});

fetchData('dino');