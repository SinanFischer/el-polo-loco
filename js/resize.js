
var elem = document.getElementById('canvas');
let fullscreenOpen = false; 
let isOnMobile = false; 

// function to check responsivness
window.onresize = function () {
    rotateScreen();
    checkViewportWidth(); 
}


// adjusts the view 
function checkViewportWidth() {
    if (window.matchMedia("(max-width: 1300px)").matches) {
        // Viewport is less or equal to 1300 pixels wide
        isOnMobile = true;
        resizeCanvas(); 

    } else {
        // Viewport is greater than 1300 pixels wide
        isOnMobile = false;
        document.getElementById("canvas").style.width = `1300px`;
        document.getElementById("canvas").style.height = `600px`;
    }
}


// shows rotate screen image if smartphone is vertically
function rotateScreen() {
    if (window.matchMedia("(orientation: portrait)").matches) {
        // Viewport is less or equal to 1300 pixels wide
        document.getElementById('rotate-screen').style.display = "flex";
    } else {
        document.getElementById('rotate-screen').style.display = "none";
    }
}


function resizeCanvas() {
    let canvasWidth = window.innerWidth;
    let canvasHeight = window.innerHeight;

    document.getElementById("canvas").style.width = `${canvasWidth}px`;
    document.getElementById("canvas").style.height = `${canvasHeight}px`;
}


function showMobileControls() {
    document.getElementById('controls').style.display = "flex";
    document.getElementById('fullscreen-btn').style.display = "flex";
}

function hideMobileControls() {
    if (isOnMobile) {
    document.getElementById('controls').style.display = "none";
    document.getElementById('fullscreen-btn').style.display = "none";
    }
    else {
        return null; 
    }
}


///////////////////////////////////// FULL SCREEN FUNCTIONS ///////////////////////////////////////////////////

function toggleFullscreen() {
    let fullscreen = document.getElementById('fullscreen');
    if (!fullscreenOpen && gameStarted) {
        fullscreenOpen = true;
        openFullscreen(fullscreen);
        console.log('Fullscreen wird gestartet'); 
    }
    else if (fullscreenOpen) {
        fullscreenOpen = false;
        closeFullscreen();
        console.log('Fullscreen wird geschlossen'); 
    } 
    else {
        return null; 
    }
}


/* View in fullscreen */
function openFullscreen(elem) {
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
        elem.msRequestFullscreen();
    }
}

/* Close fullscreen */
function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
        document.msExitFullscreen();
    }
}
///////////////////////////////////// FULL SCREEN FUNCTIONS END ///////////////////////////////////////////////////