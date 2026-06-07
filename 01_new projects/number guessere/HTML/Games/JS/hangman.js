(function () {

    const wordDisplay = document.getElementById('hangman-word');
    const messageEl = document.getElementById('hangman-msg');
    const guessedEl = document.getElementById('hangman-guessed');
    const attemptsEl = document.getElementById('hangman-attempts');
    const inputbob = document.getElementById('hangman-input');
    const guessBtn = document.getElementById('hangman-guess-btn');
    const resetBtn = document.getElementById('hangman-reset-btn');
    const hangmancategory = document.getElementById('hangman-category');
    const hangmanImage = document.getElementById('hangmanImages');

    let word = '';
    let words = [];
    let guessedLetters = [];
    let wrongAttempts = 0;
    const maxAttempts = 7;

    function pickWord() {
        if (!words || words.length === 0) return '';
        return words[Math.floor(Math.random() * words.length)];
    }

    function maskedWord() {
        if (!word) return '';
        return word.split('').map(ch =>
            guessedLetters.includes(ch) ? ch : '_'
        ).join(' ');
    }

    async function updateDisplay() {
        wordDisplay.textContent = maskedWord();
        guessedEl.textContent = 'Guessed: ' + (guessedLetters.length ? guessedLetters.join(', ') : 'none');
        attemptsEl.textContent = `Wrong attempts: ${wrongAttempts} / ${maxAttempts}`;
        await drawHangman(wrongAttempts);
    }

    function setMessage(msg, isError) {
        messageEl.textContent = msg;
        messageEl.style.color = isError ? 'darkred' : 'green';
    }

    function hasWon() {
        if (!word) return false;
        return word.split('').every(ch => guessedLetters.includes(ch));
    }

    function checkWinLose() {

        if (hasWon()) {
            setMessage(`You won! The word was "${word}".`);
            inputbob.disabled = true;
            guessBtn.disabled = true;
            return true;
        }

        if (wrongAttempts >= maxAttempts) {
            setMessage(`You lost. The word was "${word}".`, true);
            inputbob.disabled = true;
            guessBtn.disabled = true;
            return true;
        }

        return false;
    }

    async function drawHangman(stage) {

        switch (stage) {
            case 1: hangmanImage.src = "./Images/2.png"; break;
            case 2: hangmanImage.src = "./Images/3.png"; break;
            case 3: hangmanImage.src = "./Images/4.png"; break;
            case 4: hangmanImage.src = "./Images/5.png"; break;
            case 5: hangmanImage.src = "./Images/6.png"; break;
            case 6: hangmanImage.src = "./Images/7.png"; break;
            case 7: hangmanImage.src = "./Images/8.png"; break;
            default: hangmanImage.src = "./Images/1.png"; break;
        }
    }

    async function handleGuess(letter) {

        if (!letter || !/^[a-z]$/.test(letter)) {
            setMessage('Please enter a single letter (a-z).', true);
            return;
        }

        if (guessedLetters.includes(letter)) {
            setMessage(`You already guessed "${letter}".`, true);
            return;
        }

        guessedLetters.push(letter);

        if (word.includes(letter))
            setMessage(`Good guess: "${letter}"`);
        else {
            wrongAttempts++;
            setMessage(`Wrong guess: "${letter}"`, true);
        }

        await updateDisplay();
        checkWinLose();
    }

    async function resetGame() {

        if (!words.length) {
            setMessage("Word list failed to load.", true);
            return;
        }

        word = pickWord();

        if (!word) {
            setMessage("No valid words found.", true);
            return;
        }

        guessedLetters = [];
        wrongAttempts = 0;

        inputbob.value = '';
        inputbob.disabled = false;
        guessBtn.disabled = false;

        setMessage('New game started. Good luck!');
        await updateDisplay();
    }

    guessBtn.addEventListener('click', async () => {
        const val = inputbob.value.trim().toLowerCase();
        await handleGuess(val);
        inputbob.value = '';
        inputbob.focus();
    });

    inputbob.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') guessBtn.click();
    });

    resetBtn.addEventListener('click', resetGame);

    hangmancategory.addEventListener('change', async () => {

        const category = hangmancategory.value;

        try {
            const res = await fetch(`./JS/${category}.json`);
            words = await res.json();
            await resetGame();
        } catch (err) {
            console.error('Failed to load category:', err);
            setMessage("Failed to load category.", true);
        }
    });

    addEventListener('load', async () => {

        try {
            const res = await fetch("./JS/abstract.json");
            words = await res.json();
            resetGame();
        } catch (err) {
            console.error('Failed to load words:', err);
            setMessage("Failed to load words.", true);
        }
    });

})();