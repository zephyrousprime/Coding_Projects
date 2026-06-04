(function () {

    const controls = document.getElementById('rps-controls');
    const feedback = document.getElementById('rps-feedback');
    const resetBtn = document.getElementById('rps-reset');
    const playerScoreElem = document.getElementById('rps-player-score');
    const computerScoreElem = document.getElementById('rps-computer-score');

    const options = ['Atom', 'Void', 'Fractal', 'Quantum', 'Singularity'];

    let playerScore = 0;
    let computerScore = 0;
    let canPlay = true; // prevents clicking when game is over
    let stop = false; // game over flag

    addEventListener('load', () => {
        playerScoreElem.textContent = playerScore;
        computerScoreElem.textContent = computerScore;
    });

    function randomChoice() {
        return options[Math.floor(Math.random() * options.length)];
    }

    function playRound(userChoice) {

        if (stop || !canPlay) return;

        const computerChoice = randomChoice();
        let result;

      const winsAgainst = {
            Atom: ['Void', 'Quantum'],
            Void: ['Fractal', 'Singularity'],
            Fractal: ['Atom', 'Quantum'],
            Quantum: ['Void', 'Singularity'],
            Singularity: ['Atom', 'Fractal']
        };

        if (userChoice === computerChoice) {
            result = "It's a tie!";
        }
        else if (winsAgainst[userChoice].includes(computerChoice)) {
            result = 'You win!';
        }
        else {
            result = 'You lose!';
        }

        feedback.textContent = `You chose ${userChoice}, computer chose ${computerChoice}. ${result}`;
        updateScore(result);
    }

    function updateScore(outcome) {

        if (outcome === 'You win!') {
            playerScore++;
            playerScoreElem.textContent = playerScore;
        }
        else if (outcome === 'You lose!') {
            computerScore++;
            computerScoreElem.textContent = computerScore;
        }

        if (playerScore === 5 || computerScore === 5) {
            // game over message
            if (playerScore > computerScore) {
                updateFinalScore('win');
            }
            else if (computerScore > playerScore) {
                updateFinalScore('lose');
            }
            else {
                updateFinalScore('tie');
            }

            stop = true;
            canPlay = false;
        }

    }
    function updateFinalScore(condition){
        switch (condition) {
            case 'win':
                feedback.textContent = `Game over! You won ${playerScore} to ${computerScore}. Click reset to play again.`;
                break;
            case 'lose':
                feedback.textContent = `Game over! You lost ${playerScore} to ${computerScore}. Click reset to play again.`;
                break;
            case 'tie':
                feedback.textContent = `Game over! It's a tie ${playerScore} to ${computerScore}. Click reset to play again.`;
                break;
        }
    }
    controls.addEventListener('click', (e) => {
        if (!canPlay) return;
        const choice = e.target.dataset.choice;
        if (!choice) return;
        playRound(choice);
    });

    resetBtn.addEventListener('click', () => {

        playerScore = 0;
        computerScore = 0;

        playerScoreElem.textContent = playerScore;
        computerScoreElem.textContent = computerScore;

        feedback.textContent = 'Choose your quantum element';

        stop = false;
        canPlay = true;
    });

})();