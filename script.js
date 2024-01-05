const sentences = [
    'The quick brown fox jumps over the lazy dog.',
    'A journey of a thousand miles begins with a single step.',
    'All that glitters is not gold.',
    'Actions speak louder than words.',
    'Where there is a will, there is a way.',
    'The early bird catches the worm.',
    'Every cloud has a silver lining.',
    'Fortune favors the bold.',
    'A picture is worth a thousand words.',
    'Don\'t count your chickens before they hatch.',
    'A watched pot never boils.',
    'Beauty is in the eye of the beholder.',
    'Don\'t put all your eggs in one basket.',
    'An apple a day keeps the doctor away.',
    'Beggars can\'t be choosers.',
    'Better late than never.',
    'Cry over spilled milk.',
    'Don\'t bite the hand that feeds you.',
    'Don\'t judge a book by its cover.',
    'Don\'t put off until tomorrow what you can do today.'
];

let currentSentenceIndex;
let startTime;
let errorsCount = 0;
let gameActive = false;

document.addEventListener("DOMContentLoaded", function () {
    currentSentenceIndex = Math.floor(Math.random() * sentences.length);
    displayRandomSentence();
    startTime = new Date().getTime(); // Initialize startTime when the page is loaded
});

function startGame() {
    if (!gameActive) {
        gameActive = true;
        currentSentenceIndex = Math.floor(Math.random() * sentences.length); // Generate another random sentence
        startTime = new Date().getTime();
        errorsCount = 0;
        document.getElementById('user-input').value = '';
        document.getElementById('user-input').disabled = false;
        document.getElementById('result-overlay').style.display = 'none';
        displayRandomSentence(); // Display the new random sentence
    } else {
        document.getElementById('user-input').value = '';
        document.getElementById('user-input').disabled = false;
        currentSentenceIndex = Math.floor(Math.random() * sentences.length); // Generate another random sentence
        startTime = new Date().getTime(); // Set startTime for subsequent trials
        displayRandomSentence(); // Display the new random sentence
    }
}

function displayRandomSentence() {
    const sentenceDisplay = document.getElementById('word-display');
    sentenceDisplay.innerText = sentences[currentSentenceIndex];
}

function checkInput() {
    const userInput = document.getElementById('user-input').value;
    const sentenceDisplay = sentences[currentSentenceIndex];

    // Check if the user has reached the end of the sentence
    if (userInput === sentenceDisplay) {
        endGame();
    } else {
        // Check if the user has errors and reached the end of the sentence
        if (userInput.length === sentenceDisplay.length) {
            document.getElementById('user-input').disabled = true;
            updateResult();
        }
    }
}

function updateResult() {
    const userInput = document.getElementById('user-input').value;
    const sentenceDisplay = sentences[currentSentenceIndex];

    errorsCount = 0;
    for (let i = 0; i < Math.min(userInput.length, sentenceDisplay.length); i++) {
        if (userInput[i] !== sentenceDisplay[i]) {
            errorsCount++;
        }
    }

    const resultOverlay = document.getElementById('result-overlay');
    const endTime = new Date().getTime();
    const totalTime = Math.max((endTime - startTime) / 1000, 0); // Avoid division by zero or negative time
    const wordsTyped = userInput.split(' ').length;
    const wordsPerMinute = Math.round((wordsTyped / totalTime) * 60);

    resultOverlay.innerHTML = `<p>Typing Speed: ${isNaN(wordsPerMinute) ? 0 : wordsPerMinute} WPM</p><p>Errors: ${errorsCount}</p><button onclick="closeResult()">Close</button>`;
    resultOverlay.style.display = 'block';
}

function endGame() {
    document.getElementById('user-input').disabled = true;
    gameActive = false;
    updateResult();
}

function closeResult() {
    document.getElementById('result-overlay').style.display = 'none';
}

// Event listeners for input changes, focus, and start button click
document.getElementById('user-input').addEventListener('input', checkInput);
document.getElementById('user-input').addEventListener('focus', function () {
    if (!gameActive) {
        displayRandomSentence();
    }
});
document.getElementById('start-button').addEventListener('click', startGame);
