
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


// resizing the canvas to full width and heigt on fullscreen or mobile
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
    if (!fullscreenOpen && gameStarted) { // fullscreen will be activated
        fullscreenOpen = true;
        document.getElementById("canvas").style.width = `100vw`;
        document.getElementById("canvas").style.height = `100vh`;    
        openFullscreen(fullscreen);                 
        console.log('Fullscreen wird gestartet'); 

    }
    else if (fullscreenOpen) { // will be closed
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
    if (!isOnMobile)canvasNormalsize(); 
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
        document.msExitFullscreen();
    }
}


function canvasNormalsize() {
    document.getElementById("canvas").style.width = `75vw`;
    document.getElementById("canvas").style.height = `70vh`;   
}
///////////////////////////////////// FULL SCREEN FUNCTIONS END ///////////////////////////////////////////////////