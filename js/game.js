let canvas;
let world;
let keyboard = new Keyboard();
let gameStarted = false; 

function startGame() {
        if (!gameStarted) {
        gameStarted = true; 
        document.getElementById('game-start').innerHTML = "Restart game"
        document.getElementById('canvas').style.display = "block";
        document.getElementById('start-screen').style.display = "none";
        initLevel1(); //creates enemys 
        init();
        }
        else {
            gameStarted = false; 
            world.clearAllIntervals();  
        }

}



function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}


function backToMenu() {
    world.clearAllIntervals();  

    /* 
    document.getElementById('canvas').style.display = "none";
    document.getElementById('start-screen').style.display = "flex";

    */
}


window.addEventListener("keydown", (pressedKey) => {

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

    let keyCode = pressedKey['keyCode'];
    console.log('DER wude auf false gesetzt ', keyCode, pressedKey)
    if (keyCode = 37) keyboard.LEFT = false;
    if (keyCode = 39) keyboard.RIGHT = false;
    if (keyCode = 40) keyboard.DOWN = false;
    if (keyCode = 68) keyboard.D = false;
    if (keyCode = 32 || keyCode === 38) {
        keyboard.SPACE = false;  // setzt space auf true. mit keyboard.space wird auf die variable in der class Keyboard zugegriffen
        keyboard.UP = false;
    }
}); 




/* 

***************************************** FEINHEITEN UND TODOS *****************************************


    ENDGEGNER ANIMATION UND ANGRIFF
q
    MINI KÜKEN MIT EINBAUEN

    SCHADEN BEKOMMEN AUCH WENN MAN IM GEGENER BLEIBT






Bug fixen das immer 1 flasche mehr drinne ist








***************************************** IDEEN FÜR WEITERES SPIEL *****************************************



SAFE THE TACO BEFORE THE CHICKEN ARMY ARRIVES !!!!!   ** AUFGABE anzeigen lassen oben rechts
Taco placed behind ENDBOSS, after some Time when the taco is not collected. Many Enemys will spawn and run over the Player to dead.


SPIELFELD VERLÄNGERN UND ABHAUEN ZU KÖNNEN VOR DEM BOSS UND MEHR FLASCHEN ZU SAMMELN
STACHELDRAHT ALS ENDE ZEICHNEN


Ein Shop einbauen für neue Gegner oder Animationen
gesammelte Münzen werden gespeichert 

Spiel pausierbar machen 



*/ 