let canvas;
let world;
let keyboard = new Keyboard();
let gameStarted = false;
let characterLooksRight = true; // important for throwing direction

let game_over_sound = new Audio('./audio/game_over.mp3');
let game_win_sound = new Audio('./audio/win.mp3');


let timeGameStarted = 0.00;
//let timeGameEnded = 0.00;
let bestTime = 0.00;
let playTries = 0;
let wins = 0;
let defeats = 0;

let backgroundsMusic = new Audio('./audio/main_mexican_music.mp3');



async function init() {
    setURL('https://sinan-fischer.developerakademie.net/el_polo_loco/smallest_backend_ever');
    await downloadFromServer();
    leaderboard = JSON.parse(backend.getItem('leaderboard')) || [];
    loadLocal();
    createStartHTML();
    checkViewportWidth();
    rotateScreen();
}


function startGame() {
    if (!gameStarted) {
        gameStarted = true;
        document.getElementById('game-start').innerHTML = "Restart game"
        document.getElementById('canvas').style.display = "block";
        document.getElementById('start-screen').style.display = "none";
        document.getElementById('fullscreen-btn').style.display = "flex";
        toggleMainMusic('startGame'); 
        initGame();
        if (isOnMobile) {
            showMobileControls();
        }
    }
    else { // restarts game 
        stopGameShowIndex();
        saveLocal();
        restartGame3sec();

    }
}



function initGame() {
    playTries++;
    initLevel1(); //creates enemys
    canvas = document.getElementById('canvas');createStartHTML
    world = new World(canvas, keyboard);
    setTimeGameStarts();
}


// closes game (stops all going processes for canvas) and shows startscreen html
function stopGameShowIndex() {
    gameStarted = false; // 1! 
    if (fullscreenOpen) closeFullscreen();
    world.endboss.pauseMusicByEnd();
    stopMainMusic(); 
    world.clearAllIntervals();
    document.getElementById('canvas').style.display = "none";
    document.getElementById('start-screen').style.display = "flex";
}


// gets back to menu 
function backToMenu(winOrLost) {
    if (gameStarted) {
        stopGameShowIndex();
        saveLocal();
        createStartHTML();
        hideMobileControls();
        showEndScreen(winOrLost);

    }
    else {
        saveLocal();
        createStartHTML();
    }
}


// decides which screen is displayed by win or loose 
function showEndScreen(winOrLost) {
    if (winOrLost === 0) {
        gameOverScreen();
        defeats++;
    }
    if (winOrLost === 1) {
        winnerScreen();
        wins++;
        setTimeGameEnded();
    }
}


function setTimeGameStarts() {
    timeGameStarted = new Date().getTime();
}


// returns true when in past 3 seconds was hit
function setTimeGameEnded() {
    let timepassed = new Date().getTime() - timeGameStarted;  // difference in miliseconds
    timepassed = timepassed / 1000;  // Difference in seconds
    timepassed = timepassed.toFixed(2);
    setBestTime(timepassed);
}


function setBestTime(timepassed) {
    if (timepassed >= bestTime) {
        bestTime = timepassed;
    }
    if (bestTime === 0) {
        bestTime = timepassed;
    }
    else {
        console.log('nothing happens')
    }
}


function saveLocal() {
    let bestTimeAsText = JSON.stringify(bestTime);
    localStorage.setItem('bestTime', bestTimeAsText);

    let playTriesAsText = JSON.stringify(playTries);
    localStorage.setItem('playTries', playTriesAsText);

    let winsAsText = JSON.stringify(wins);
    localStorage.setItem('wins', winsAsText);

    let defeatsAsText = JSON.stringify(defeats);
    localStorage.setItem('defeats', defeatsAsText);
}


function loadLocal() {
    let bestTimeAsText = localStorage.getItem('bestTime');
    let playTriesAsText = localStorage.getItem('playTries');
    let winsAsText = localStorage.getItem('wins');
    let defeatsAsText = localStorage.getItem('defeats');

    if (bestTimeAsText && defeatsAsText) {

        bestTime = JSON.parse(bestTimeAsText);
        playTries = JSON.parse(playTriesAsText);
        wins = JSON.parse(winsAsText);
        defeats = JSON.parse(defeatsAsText);
    }
}


// ----------------- KEY PRESSES ----------------- // 

window.addEventListener("keydown", (pressedKey) => {

    let keyCode = pressedKey['keyCode'];

    if (keyCode === 37) {
        keyboard.LEFT = true;
        characterLooksRight = false; 
    }
    if (keyCode === 39) {
        keyboard.RIGHT = true;
        characterLooksRight = true; 
    }
    if (keyCode === 40) {
        keyboard.DOWN = true;
    }
    if (keyCode === 68) {
        keyboard.D = true;
    }
    if (keyCode === 32 || keyCode === 38) {
        keyboard.UP = true;
        keyboard.SPACE = true;
    }
});

window.addEventListener("keyup", (pressedKey) => {

    //console.log('keyup key', pressedKey)

    let keyCode = pressedKey['keyCode'];
    //console.log('DER wude auf false gesetzt ', keyCode, pressedKey)
    if (keyCode === 37) keyboard.LEFT = false;
    if (keyCode === 39) keyboard.RIGHT = false;
    if (keyCode === 40) keyboard.DOWN = false;
    if (keyCode === 68) keyboard.D = false;
    if (keyCode === 32 || keyCode === 38) {
        keyboard.SPACE = false;  // setzt space auf true. mit keyboard.space wird auf die variable in der class Keyboard zugegriffen
        keyboard.UP = false;
    }
});


// ----------------- MOBILE TOUCH ----------------- // 

function touchBtnEvents() {

    document.getElementById('btn-left').addEventListener("touchstart", (e) => {
        e.preventDefault();
        keyboard.LEFT = true;
        characterLooksRight = false; 
    })
    document.getElementById('btn-left').addEventListener("touchend", (e) => {
        keyboard.LEFT = false;

    })

    document.getElementById('btn-right').addEventListener("touchstart", (e) => {
        e.preventDefault();
        keyboard.RIGHT = true;
        characterLooksRight = true; 
    })
    document.getElementById('btn-right').addEventListener("touchend", (e) => {
        keyboard.RIGHT = false;
    })

    document.getElementById('btn-jump').addEventListener("touchstart", (e) => {
        e.preventDefault();
        keyboard.SPACE = true;
    })
    document.getElementById('btn-jump').addEventListener("touchend", (e) => {
        keyboard.SPACE = false;
    })

    document.getElementById('btn-throw').addEventListener("touchstart", (e) => {
        e.preventDefault();
        keyboard.D = true;
    })
    document.getElementById('btn-throw').addEventListener("touchend", (e) => {
        keyboard.D = false;
    })
}


window.addEventListener("touchstart", (pressedKey) => {

    let keyCode = pressedKey['keyCode'];

    if (keyCode === 37) {
        keyboard.LEFT = true;
    }
    if (keyCode === 39) {
        keyboard.RIGHT = true;
    }
    if (keyCode === 40) {
        keyboard.DOWN = true;
    }
    if (keyCode === 68) {
        keyboard.D = true;
    }
    if (keyCode === 32 || keyCode === 38) {
        keyboard.UP = true;
        keyboard.SPACE = true;
    }
});


window.addEventListener("keyup", (pressedKey) => {

    //console.log('keyup key', pressedKey)

    let keyCode = pressedKey['keyCode'];
    //console.log('DER wude auf false gesetzt ', keyCode, pressedKey)
    if (keyCode === 37) keyboard.LEFT = false;
    if (keyCode === 39) keyboard.RIGHT = false;
    if (keyCode === 40) keyboard.DOWN = false;
    if (keyCode === 68) keyboard.D = false;
    if (keyCode === 32 || keyCode === 38) {
        keyboard.SPACE = false;  // setzt space auf true. mit keyboard.space wird auf die variable in der class Keyboard zugegriffen
        keyboard.UP = false;
    }
});












