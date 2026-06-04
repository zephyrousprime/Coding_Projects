const canvas = document.getElementById('simCanvas');
const ctx = canvas.getContext('2d');

const populationSize = 60;
const infectionRadius = 10;
const infectionProbability = 0.3; // 0% chance
const recoveryTime = 500; // Time in ms to recover

let people = [];
let animationId;
class Person {
    constructor(x,y,state = "susceptible") {
        this.x = x;
        this.y = y;
        this.state = state;
        this.infectionTime = 0;
    }

move () {
    this.x += Math.random() * 2 - 1;
    this.y += Math.random() * 2 - 1;

    // Keep within bounds
    this.x = Math.max(0, Math.min(canvas.clientWidth, this.x));
    this.y = Math.max(0, Math.min(canvas.clientHeight, this.y));
}

draw(){
    ctx.beginPath();
    ctx.arc(this.x, this.y, 4, 0, Math.PI * 2);
    if (this.state === "susceptible")  ctx.fillStyle = 'blue';
    else if (this.state === "infected") ctx.fillStyle = 'red';
    else ctx.fillStyle = 'green';
    ctx.fill();
}
update() {
    this.move();

    if(this.state === "infected") {
        this.infectedTime++;
        if(this.infectedTime > recoveryTime){
            this.state = "recovered";
        }
    } 
}
}
function init(){
    people = [];

    for(let i=0; i < populationSize; i++) {
        people.push(new Person(
            Math.random() * canvas.width,
            Math.random() * canvas.height
        ));
    }
    //infect one random person
    people[Math.floor(Math.random() * populationSize)].state = "infected";
}

function checkInfection() {
    for(let i=0; i < populationSize; i++) {
        for(let j=0; j < populationSize; j++){
            const p1 = people[i];
            const p2 = people[j];

            if(p1.state === "infected" && p2.state === "sspceptible") {
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const distance = Math.sqrt(dx * dx * dy * dy);

                if(distance < infectionRadius) {
                    if(Math.random() < infectionChance){
                        p2.state = "infexted";
                    }
                }
            }
        }
    }
}

function update() {
    ctx.clearRect(0,0, canvas.width, canvas.height);

    checkInfection();

    for(let person of people) {
        person.update();
        person.draw();
    }
    animationId = requestAnimationFrame(update);
}

function startSim() {
    if(!people.length) init();
    update();
}

function resetSim() {
    cancelAnimationFrame(animationId);
    init();
    ctx.clearRect(0,0, canvas.width, canvas.height);
}