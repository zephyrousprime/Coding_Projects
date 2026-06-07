(function () {
    const guessInput = document.getElementById('ng-guess');
    const guessButton = document.getElementById('ng-guess-btn');
    const resetButton = document.getElementById('ng-reset');
    const feedback = document.getElementById('ng-feedback');
    const tryAgain = document.getElementById('ng-tryagain');
    let attempts = 0;
    let randomNumber = Math.floor(Math.random() * 360) + 1;

    function setFeedback(msg, isError) {
        feedback.textContent = msg;
        feedback.style.color = isError ? '#7f1d1d' : '#064e3b';
    }

    function resetGame() {
        attempts = 0;
        randomNumber = Math.floor(Math.random() * 360) + 1;
        guessInput.value = '';
        setFeedback('');
        tryAgain.textContent = '';
    }

   
    function Game(){
        const val = parseInt(guessInput.value, 10);
        if (Number.isNaN(val) || val < 1 || val > 360) {
            setFeedback('Please enter a valid number between 1 and 360.', true);
            return;
        }
        attempts++;
        if (val === randomNumber) {
            setFeedback(`Congratulations! You guessed the number in ${attempts} attempts.`);
            tryAgain.textContent = 'Press Reset to play again.';
        } else if (val < randomNumber) {
            setFeedback('Too low! Try again.');
        } else {
            setFeedback('Too high! Try again.');
        }
    }
    resetButton.addEventListener('click', resetGame);
    guessInput.addEventListener('keypress', (event) => {
        if (event.key === "Enter") {
            Game();
        }
    });
    guessButton.addEventListener('click', Game());
    // initialize
    resetGame();
})();
function handleEvent(event) {
  if (event.key === "Enter") {
    /* handle a full screen toggle */
  } else {
    /* handle a full screen toggle error */
  }
}
