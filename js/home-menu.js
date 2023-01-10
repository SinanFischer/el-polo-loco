
function restartGame3sec() {
    document.getElementById('start-screen').innerHTML = `
    <h1> Game will be restarted in... </h1>
    <div id="restart-countdown"> 3 </div>
    `;
    setTimeout(() => { document.getElementById('restart-countdown').innerHTML = '2' }, 1000);
    setTimeout(() => { document.getElementById('restart-countdown').innerHTML = '1' }, 2000);
    setTimeout(() => { document.getElementById('restart-countdown').innerHTML = '0' }, 3000);
    setTimeout(() => startGame(), 4000);
}


function gameOverScreen() {
    document.getElementById('start-screen').innerHTML = `<img src="./img_pollo_locco/img/9_intro_outro_screens/start/startscreen_2.png" id="start-screen-img">`;
    document.getElementById('start-screen-img').src = "./img_pollo_locco/img/9_intro_outro_screens/game_over/oh no you lost!.png";
    game_over_sound.play();

    setTimeout(() => { createStartHTML(); }, 4000);
}


function winnerScreen() {
    document.getElementById('start-screen').innerHTML = `<img src="./img_pollo_locco/img/9_intro_outro_screens/start/startscreen_2.png" id="start-screen-img">`;
    document.getElementById('start-screen-img').src = "./img_pollo_locco/img/9_intro_outro_screens/game_over/Winner-Winner-Chicken-Dinner_280x183.png";
    game_win_sound.play();
    setTimeout(() => { createLeaderboard(1); }, 4000);// starts leaderboard with input
}


function createStartHTML() {
    document.getElementById('start-screen').innerHTML = `
    <div class="head-line"> 
        <span> <i class="best-list-field" onclick="helpLockedHTML()"> Help  </i> </span>
        <span class="story-hl"> Story </span>
        <span  > <i  class="best-list-field" onclick="createLeaderboard()"> Leaderboard </i> </span>
    </div>

    <span class="story-text">

        <b> The greedy chickens stole El pollo Locos taco! <br> <br> 
        Since there is no self-control with these chickens, the taco is very likely already lost. Nonetheless, this can not be let through on behalf of El Pollo locos name without consequences! </b>
      
    </span>
    <div class="bottom-line"> 
        <span>  Your best time <span id="best-time"> ${bestTime} sec </span> </span>  
        <button onclick="startGame()"> Get ready for Revenge </button>
        <span > Tries/Loses/Wins <span id="Tries"> ${playTries}/${defeats}/${wins} </span> </span> 
    </div> 
    `;
}


function helpLockedHTML() {
    if (defeats <= 3) {
        document.getElementById('start-screen').innerHTML = `
        <h1 class="best-list-field" style="font-size: 60px" onclick="backToMenu()"> Go Back </h1> 

        Come on! First try on your own. <br> 
        Help will be unlocked after 3 defeats or 1 win. <br> 
        ${defeats}/3 | ${wins}/1
    `;
    }

    if (defeats > 3 || wins >= 1) {
        helpTextHTML(); 
    }
}


function helpTextHTML() {
    document.getElementById('start-screen').innerHTML = `
    <h1 class="best-list-field" style="font-size: 60px" onclick="backToMenu()"> Go Back </h1> 

        The boss chicken will die after 9 throws. <br> 
        Chickens come back to you, when you dont kill them. <br> 
        If the Boss hits you and you surive, he will stand still for a moment. This is your oppurtunity to get the distance you need!
   `;
}