const secrentnumber = Math.round(Math.random()*100)
const guess = document.getElementById("guess")
const result = document.getElementById("output")
const button = document.getElementById("button")
let guessarray = []
let bob = 0
let lagnumber = 2
let lagnumber2 = 1

function CheckGuess(event){
    event.preventDefault()
    console.log("as")
    let userGuess = parseInt(guess.value)
    if (userGuess === secrentnumber) {
        result.textContent = "Congratulations! You guessed the number."

    } else if (userGuess > secrentnumber) {
        result.textContent = "Too high! Try a lower number."
    } else {
        result.textContent = "Too low! Try a higher number."
    }
    guess.focus();
    guess.value = null;
}
function restart(){
    window.location.reload()
}
guess.addEventListener("input", Creatbutton)
guess.addEventListener("input", Creatbutton)
guess.addEventListener("input", Creatbutton)
function Creatbutton(){
    const newButton = document.createElement("button");
    newButton.textContent = "Check Guess";
    newButton.addEventListener("click", CheckGuess);
    document.body.appendChild(newButton);
}
button.addEventListener("click", CheckGuess)
function lag(){
    
    bob = lagnmber + lagnmber2
    console.log(bob)
    lagnumber2 = lagnumber
    lagnumber = bob
    
}
setInterval(lag, 0,)