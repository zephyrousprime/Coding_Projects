(function () {

    const cells = Array.from(document.querySelectorAll('.ttt-cell'));
    const statusEl = document.getElementById('ttt-status');
    const resetBtn = document.getElementById('ttt-reset');
    const modeToggle = document.getElementById('ttt-mode-toggle');
    const quantumToggle = document.getElementById('ttt-quantum-toggle');

    let board = Array(9).fill('');
    let currentPlayer = 'X';   
    let notcurrentPlayer = 'O';
    let gameOver = false;
    let twoPlayerMode = false;
    let quantumMode = false;
    const superpositionCells = new Set();

    const wins = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ];

    function render() {
        cells.forEach((cell, i) => {
            if (superpositionCells.has(i)) {
                cell.textContent = 'Ψ';
                cell.classList.add('superposition');
            } else {
                cell.textContent = board[i];
                cell.classList.remove('superposition');
            }
        });

        if (gameOver) return;

        statusEl.textContent = quantumMode
            ? `Quantum Mode: ${currentPlayer}'s turn`
            : `Current: ${currentPlayer}`;
    }

    function isBoardFull() {
        return board.every((cell, i) =>
            cell !== '' || superpositionCells.has(i)
        );
    }

    function checkWin(player) {
        for (const [a,b,c] of wins) {
            if (board[a] === player &&
                board[b] === player &&
                board[c] === player) {
                Win(player);
                return true;    
            }
        }

        if (quantumMode) {
            for (const [a,b,c] of wins) {
                const row = [a,b,c];
                const owned = row.filter(i => board[i] === player).length;
                const superpos = row.filter(i => superpositionCells.has(i)).length;

                if (owned === 2 && superpos === 1) {
                    Win(player);
                    return true;
                }
            }
        }

        return false;
    }

    function switchPlayer() {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        notcurrentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }

    function makeMove(i) {
        if (gameOver) return;

        if (!quantumMode) {
            if (board[i]) return;
            board[i] = currentPlayer;
        } else {
            if (superpositionCells.has(i)) {
                superpositionCells.delete(i);
                board[i] = Math.random() < 0.5 ? 'X' : 'O';
            }
            else if (!board[i]) {
                superpositionCells.add(i);
            }
            else return;
        }

        if (checkWin(currentPlayer)) return;
        if (checkWin(notcurrentPlayer)) return;

        if (isBoardFull()) {
            Win('tie');
            return;
        }

        switchPlayer();
        render();

        // ✅ AI works in BOTH modes now
        if (!twoPlayerMode && !gameOver && currentPlayer === 'O') {
            setTimeout(aiMove, 400);
        }
    }

    function availableMoves() {
        return board
            .map((v, i) => (!v ? i : null))
            .filter(v => v !== null);
    }
    function Win(player) {
        statusEl.textContent = (player === 'tie') ? "It's a tie!" : `⚛️ ${player} wins!`;
        gameOver = true;
        render();
        return;
    }
    function aiMove() {
        if (gameOver) return;

        const moves = availableMoves();
        if (!moves.length) return;

        const choice = moves[Math.floor(Math.random() * moves.length)];

        // ✅ Quantum AI behavior
        if (quantumMode) {
            if (superpositionCells.has(choice)) {
                // collapse
                superpositionCells.delete(choice);
                board[choice] = Math.random() < 0.5 ? 'X' : 'O';
            } else {
                    superpositionCells.add(choice);
            }

            if (checkWin('O')) {
                Win('O');
                return;
            }

            if (isBoardFull()) {
                Win('tie');
                return;
            }

            currentPlayer = 'X';
            notcurrentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            render();
        } else {
            makeMove(choice);
        }
    }

    function resetGame() {
        board = Array(9).fill('');
        currentPlayer = 'X';
        gameOver = false;
        superpositionCells.clear();
        cells.forEach(c => c.classList.remove('superposition'));
        statusEl.textContent = 'Game reset';
        render();
    }

    cells.forEach((cell, i) => {
        cell.addEventListener('click', () => makeMove(i));
    });

    resetBtn.addEventListener('click', resetGame);

    // ✅ RESET when switching modes
    modeToggle.addEventListener('change', () => {
        twoPlayerMode = modeToggle.checked;
        resetGame();
    });

    quantumToggle.addEventListener('change', () => {
        quantumMode = quantumToggle.checked;
        resetGame();
    });

    render();

})();