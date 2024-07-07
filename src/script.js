let userMove = '';
let message = '';
let moveComputer = '';
const moves = ['✊🏼', '🤚🏼', '✌🏼'];
// Text to display the result of the game
let resultElementText = document.getElementById('js-result');

const moveElementText = document.getElementById('js-moves');
const autoPlayButton = document.getElementById('auto-play-button');
const restButton = document.getElementById('reset-button');
const rockButton = document.getElementById('rock-button');
const paperButton = document.getElementById('paper-button');
const scissorButton = document.getElementById('scissor-button');
const bombButton = document.getElementById('bomb-button');
// the number of a interval (autoPlay)
let intervalId;

// Use a Default Operator to initialize the scores, if the scores are null then scores are initialized
let scores = JSON.parse(localStorage.getItem('score')) || {userScore: 0, computerScore: 0, tie: 0};

// Display the Default Message and Score
defaultMessage();
displayScore();


// Display Updates
// Default Message
function defaultMessage() {
    resultElementText.textContent = 'Start the Game';
    moveElementText.textContent = '';
}
//To change the display for to score
function displayScore() {
    document.getElementById('js-score').textContent = `User Score: ${scores.userScore} - Computer Score: ${scores.computerScore}, - Tie: ${scores.tie}`;
}

function updateMessages(userMove, computerMove, rulesPlay) {
    moveElementText.textContent = rulesPlay;
    resultElementText.textContent = `You:  ${userMove} -- Computer: ${computerMove}.`;  
}


/*
    Functions to Play
*/
// Get the move of the computer
function computerMove() {
    let computerMove = Math.floor(Math.random() *3);
    return moves[computerMove];
}

// Funtion to know the Rules of Rock,Paper,Scissor game 
function rulesPlay(userMove, computerMove, scores) {
    if (
        userMove === '✊🏼' && computerMove === '✌🏼' ||
        userMove === '🤚🏼' && computerMove === '✊🏼' ||
        userMove === '✌🏼' && computerMove === '🤚🏼'
    ) {
        scores.userScore ++;
        updateMessages(userMove, computerMove, 'You Win');
        return 'You Win';
    }
    else if (userMove === computerMove) {
        scores.tie ++;
        updateMessages(userMove, computerMove, 'Is a Tie');
        return 'Is a Tie';
    }
    // Trow and error if the user move is other things
    try {
        if (moves.includes(userMove)) {
            scores.computerScore ++;
            updateMessages(userMove, computerMove, 'You Loose');
            return 'You Loose';
        } else {
            updateMessages(userMove, computerMove, 'Eso no es un movimiento valido');
            throw new Error('Eso no es un movimiento valido');
        }
    } catch (Error) {
        console.error(Error);
    }
    // Save the score in the local storage, localStorage is a built-in object
    localStorage.setItem('score', JSON.stringify(scores));
    
}

// Logic of Auto Play
let isAutoPlaying = false;
function autoPlay (scores) {
    if (!isAutoPlaying) {
        intervalId = setInterval(() => {
            let autoUserMove = computerMove();
            rulesPlay(autoUserMove, computerMove(), scores);
            displayScore();
        },1000) 
        isAutoPlaying=true;
    } else {
        clearInterval(intervalId);
        isAutoPlaying = false;
    }
}


/*
    AddEventsListeners
*/
// Buttons to Play
rockButton.addEventListener('click', () => {
    rulesPlay('✊🏼', computerMove(), scores);
    displayScore();
});

paperButton.addEventListener('click', () => {
    rulesPlay('🤚🏼', computerMove(), scores);
    displayScore();
});

scissorButton.addEventListener('click', () => {
    rulesPlay('✌🏼', computerMove(), scores);
    displayScore();
});
bombButton.addEventListener('click', () => {
    rulesPlay('💣', computerMove(), scores);
});

// Reset Button
restButton.addEventListener('click', () => {
    if (confirm('Are you sure you want reset the score?')) {
        { scores.userScore = 0, scores.computerScore = 0, scores.tie = 0 };
        localStorage.removeItem('score');
        displayScore();
        defaultMessage();  
    }
})

// AutoPlayButton
autoPlayButton.addEventListener('click', () => {
    const isPlay = autoPlayButton.textContent === 'Stop Play';
    isPlay ? autoPlayButton.textContent = 'AutoPlay' : autoPlayButton.textContent = 'Stop Play';
    autoPlayButton.classList.toggle('clickedAutoPlay');
    autoPlay(scores);
});

// Play with the keyboard
document.body.addEventListener('keydown', (event) => {
    if (event.key === 'r') {
        rulesPlay('✊🏼', computerMove(), scores);
        displayScore();
    } else if (event.key === 'p') {
        rulesPlay('🤚🏼', computerMove(), scores);
        displayScore();
    }
    else if (event.key === 's') {
        rulesPlay('✌🏼', computerMove(), scores);
        displayScore();
    } else if (event.key === 'a') {
        const isNotPlay = autoPlayButton.textContent === 'Stop Play';
        isNotPlay ? autoPlayButton.textContent = 'AutoPlay' : autoPlayButton.textContent = 'Stop Play';
        autoPlayButton.classList.toggle('clickedAutoPlay');
        autoPlay(scores);
    }
});
