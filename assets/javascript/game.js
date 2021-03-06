//OBJECTS
var metallica = {
    Artist: "Metallica",
    Album: "Master of Puppets (1986)",
    Song: "Welcome Home(Sanitarium)"
}
var pantera = {
    Artist: "Pantera",
    Album: "Cowboys From Hell (1990)",
    Song: "Domination"
}
var aliceinchains = {
    Artist: "Alice in Chains",
    Album: "Dirt (1992)",
    Song: "Would?"
}
var queen = {
    Artist: "Queen",
    Album: "Innuendo (1991)",
    Song: "Innuendo"
}

//VARIABLES
var wordGuessText = "";
var incorrectGuesses = [];
var wordGuess = [];
var songs = [
    "sanitarium",
    "domination",
    "would",
    "innuendo"
];
var currentWordIndex;
var remainingGuesses;
var wins = 0;
var losses = 0;
var gameFinish = false;
const maxAttempts = 12;

//IMAGES ARRAY
albums = [
    "assets/images/MasterofPuppets.jpg",
    "assets/images/Innuendo.png",
    "assets/images/cowboysfromhell.png",
    "assets/images/dirt.png",
    "assets/images/youLose.png"
];

//SONG FILES ARRAY
music =[
    "assets/songs/metallica-WelcomeHome(Sanitarium).mp3",
    "assets/songs/queen-Innuendo.mp3",
    "assets/songs/pantera-Domination.mp3",
    "assets/songs/aliceInChains-Would.mp3"
];


//DISPLAYS MAX ATTEMPS, CLEARS ARRAYS & HIDES IMAGES
function gameReset() {
    
    remainingGuesses = maxAttempts;

    currentWordIndex = Math.floor(Math.random() * (songs.length));

    incorrectGuesses = [];
    wordGuess = [];

    //HIDE IMAGES & WIN/LOSS BANNERS AT START
    document.getElementById("puppetz").src = "";
    document.getElementById("innuendo").src = "";
    document.getElementById("cowboysFromHell").src = "";
    document.getElementById("aliceInChains").src = "";
    document.getElementById("youLose").src = "";

    for (var i = 0; i < songs[currentWordIndex].length; i++) {
        wordGuess.push("_");
    }

    document.getElementById("winner1").style.cssText = "display: none";
    document.getElementById("winner2").style.cssText = "display: none";
    document.getElementById("loser1").style.cssText = "display: none";
    document.getElementById("loser2").style.cssText = "display: none";

    updateDisplay();
};

//UPDATES DISPLAY WITH WINS/LOSSES & GUESSES
function updateDisplay() {
    
    document.getElementById("winsh4").innerText = ("Wins: " + wins);
    document.getElementById("lossh4").innerText = ("Losses: " + losses);

    wordGuessText = "";

    for (var i = 0; i < wordGuess.length; i++) {
        wordGuessText += wordGuess[i];
    }

    document.getElementById("songName").innerText = wordGuessText;
    document.getElementById("guessesRemaining").innerText = remainingGuesses;    
    document.getElementById("lettersGuessed").innerText = incorrectGuesses;
    
};

function evaluateGuess(letter) {
// console.log(letter);
    for (var i = 0; i < songs[currentWordIndex].length; i++) {
        
        if(songs[currentWordIndex][i].toLowerCase() === letter.toLowerCase()) {
            wordGuess[i] = letter;
        }
    };
        if(letter <= wordGuess) {
            remainingGuesses--;
        }
};

//CHECK FOR WINS
function checkForWin() {
    if (wordGuess.indexOf("_") === -1) {
        document.getElementById("winner1").style.cssText = "display: block";
        document.getElementById("winner2").style.cssText = "display: block";
        wins++;
        gameFinish = true;
    }
};

//CHECK FOR LOSS
function checkForLoss() {

    if (remainingGuesses <= 0) {
    document.getElementById("loser1").style.cssText = "display: block";
    document.getElementById("loser2").style.cssText = "display: block";
    losses++;
    gameFinish = true;
    }

};

//MAKES GUESS
function makeGuess(letter) {
    if (remainingGuesses > 0) {
        if (incorrectGuesses.indexOf(letter) === -1) {
            incorrectGuesses.push(letter);
            evaluateGuess(letter);
        }
    }
};

//EVENT KEY
document.onkeydown = function(event) {
    if (gameFinish) {
        gameReset();
        gameFinish = false;
    }
    else {
        if (event.keyCode >= 65 && event.keyCode <= 90) {
            makeGuess(event.key.toUpperCase());
            updateDisplay();
            checkForWin();
            checkForLoss();
        }
    }
};