let leaderboard = [

    {
        "playerName": 'Ali Sakdelle',
        "date": '19.02.1631',
        "bestTime": '89.12 s',
    },

    {
        "playerName": 'BUCHHOLZ DER WILDE',
        "date": '12.06.1151',
        "bestTime": '42.45 s',
    },

    {
        "playerName": 'STRACIATELLE',
        "date": '22.05.2005',
        "bestTime": '4.98 s',
    },
];



let todayDay; 
let todayMonth; 
let todayYear; 




function createLeaderboard(win) {
    createLeaderboardInfoHTML();
    sortLeaderboard(); 
    leaderboard.forEach(player => { createLeaderboardPlayerHTML(player) });
    setCurrentDate(); 
    if (win) {
        document.getElementById('input-div').innerHTML = ` <input id="player-name" placeholder="Your Name" required >   <div class="data"> ${todayDay}.${todayMonth}.${todayYear} </div> <div class="data">${bestTime} s</div>`;
        document.getElementById('submit-button-div').innerHTML = ` <button class="submit-player-name" onclick="submitSignIn()"> Submit </button>`;
    }

}


// function saves/pushes new player to leaderboard
async function submitSignIn() {
    let newPlayerName = document.getElementById('player-name').value;
    if (newPlayerName === '') newPlayerName = 'anonym' 
    newPlayer = {
        "playerName": newPlayerName,
        "date": `${todayDay}.${todayMonth}.${todayYear}`,
        "bestTime": `${bestTime} s`,
    };

    leaderboard.push(newPlayer);
    await backend.setItem('leaderboard', JSON.stringify(leaderboard));
    createLeaderboard(); 

    document.getElementById('input-div').innerHTML = ``;
    document.getElementById('submit-button-div').innerHTML = ``;
}


function setCurrentDate() {
    let todayDate = new Date();
    todayDay = todayDate.getDate();
    todayMonth = todayDate.getMonth() + 1;
    todayYear = todayDate.getFullYear();

    formatDate(); 
}


// to get 01.01.2023, not 1.1.22
function formatDate() {
    todayDay = todayDay 
                .toString()
                .padStart(2, '0');

    todayMonth = todayMonth
                .toString()
                .padStart(2, '0');
}


// sorts the leaderboard by time
function  sortLeaderboard() {
    leaderboard = leaderboard.sort((a, b) => {
        if (a.bestTime < b.bestTime) {
          return -1;
        }
      });
  
}


function createLeaderboardPlayerHTML(player) {
    document.getElementById('leaderboard').innerHTML += `
        <div class="table-row">
          <div class="data">${player['playerName']}</div><div class="data"> ${player['date']} </div> <div class="data">${player['bestTime']}</div>
        </div>
    `;
}



function createLeaderboardInfoHTML() {
    document.getElementById('start-screen').innerHTML = `
    <div class="back-leaderboard" onclick="createStartHTML()">Back to menu</div> 

    <div class="leaederboard" id="leaderboard"> 
        <div class="table-info">
          <div class="info">Player</div><div class="info"> Date </div> <div class="info">Best time</div>
        </div>
    </div>

      <div class="input-div" id="input-div"> </div>
      <div id="submit-button-div"> </div>
    `;
}
