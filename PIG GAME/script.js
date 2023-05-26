let scores, roundScore, activePlayer, gamePlaying;

function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.getElementById('player1-panel').classList.remove('winner');
    document.getElementById('player2-panel').classList.remove('winner');
    document.getElementById('player1-panel').classList.remove('active');
    document.getElementById('player2-panel').classList.remove('active');
    document.getElementById('player1-panel').classList.add('active');
}

function switchPlayer() {
    roundScore = 0;
    document.getElementById('current-' + activePlayer).textContent = '0';
    activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
    document.getElementById('player1-panel').classList.toggle('active');
    document.getElementById('player2-panel').classList.toggle('active');
}

function rollDice() {
    if (gamePlaying) {
        // Generate random dice number
        let dice = Math.floor(Math.random() * 6) + 1;

        // Display the dice image
        let diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

        // Show the rolled number
        let rolledNumberDOM = document.getElementById('rolled-number');
        rolledNumberDOM.textContent = 'Rolled Number: ' + dice;

        // Update the round score if the rolled number is not 1
        if (dice !== 1) {
            roundScore += dice;
            document.getElementById('current-' + activePlayer).textContent = roundScore;
        } else {
            switchPlayer();
        }
    }
}



document.getElementById('btn-hold').addEventListener('click', function () {
    if (gamePlaying) {
        // Add the current score to the player's global score
        scores[activePlayer] += roundScore;

        // Update the UI
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

        // Check if the player won the game
        if (scores[activePlayer] >= 100) {
            document.getElementById('name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.getElementById('player' + (activePlayer + 1) + '-panel').classList.add('winner');
            document.getElementById('player' + (activePlayer + 1) + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            switchPlayer();
        }
    }
});

document.getElementById('btn-new').addEventListener('click', init);

document.getElementById('dice').addEventListener('click', rollDice);

// Initialize the game
init();
