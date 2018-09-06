// Creating Global variables to hold the number of Wins, Losses, Lives, an array to hold guessedLetters,
// the Computer's letter selection, and obviously the most important... an array singing the alphabet.
var wins = 0;
var lives = 12;
var word = [];
var guessedLetters = [];
var lettersleft;
/*var computerChoice;*/
var alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
var animals = [
    "cat","dog","hippopotamus","rhinoceros","horse","donkey","llama","hoopoe","labradoodle","ostrich"
];

// Creating variables that hold the references to the location in the HTML where we want to display things.
var winsTally = document.getElementById("wins-display");
var chosenWord = document.getElementById("word-display");
var guessesLeft = document.getElementById("guesses-left");
var userGuessLog = document.getElementById("guesses-display");

winsTally.textContent = "Wins: " + wins;
guessesLeft.textContent = "Guesses Remaining " + lives;
userGuessLog.textContent = "Guessed Letters: " + guessedLetters;

// FUNCTIONS
//======================================================================================================================
/*function gameStart() {
    winsTally.textContent = "Wins: " + wins;
    guessesLeft.textContent = "Guesses Remaining " + lives;
    userGuessLog.textContent = "Guessed Letters: " + guessedLetters;
    var computerChoice = animals[Math.floor(Math.random() * animals.length)];
        console.log(computerChoice);
        var word = [];
            for (var i = 0; i < computerChoice.length; i++) {
                word[i] = "_";
            }
    var lettersleft = computerChoice.length;
        console.log(lettersleft);
    chosenWord.textContent = "[ " + word.join(" ") + " ]";
}*/

function correct () {
    for (var j = 0; j < computerChoice.length; i++) {
        if (computerChoice[j] === userGuess) {
            word[j] = userGuess;
            lettersleft--;
        }
    }
}
function incorrect() {
    lives--;
    guessedLetters.unshift(" " + userGuess.toUpperCase + " ");
}
function resetGame () {
    lives = 12;
    guessedLetters = [];
    guessesLeft.textContent = "Guesses Remaining " + lives;
    userGuessLog.textContent = "Guessed Letters: " + guessedLetters;
    var computerChoice = animals[Math.floor(Math.random() * animals.length)];
    console.log(computerChoice);
    var word = [];
    for (var i = 0; i < computerChoice.length; i++) {
        word[i] = "_";
    }
    var lettersleft = computerChoice.length;
    console.log(lettersleft);
    chosenWord.textContent = "[ " + word.join(" ") + " ]";
}

// GAME OPERATIONS
//======================================================================================================================
// gameStart();
//   while (lettersleft > 0) {
winsTally.textContent = "Wins: " + wins;
guessesLeft.textContent = "Guesses Remaining " + lives;
userGuessLog.textContent = "Guessed Letters: " + guessedLetters;
var computerChoice = animals[Math.floor(Math.random() * animals.length)];
console.log(computerChoice);
var word = [];
for (var i = 0; i < computerChoice.length; i++) {
    word[i] = "_";
}
var lettersleft = computerChoice.length;
console.log(lettersleft);
while (lettersleft > 0) {
    chosenWord.textContent = "[ " + word.join(" ") + " ]";
}

document.onkeyup = function(event){
    userGuess = event.key.toLowerCase();
    console.log(userGuess);
    // Check to make sure that the game player properly enters an actual letter.
    if (alphabet.indexOf(userGuess) >= 0) {
        for (var j = 0; j < computerChoice.length; j++) {
            if (userGuess === computerChoice[j]) {
                word[j] = userGuess;
                lettersleft--;
            } else {
                lives--;
                guessedLetters.unshift(" " + userGuess.toUpperCase + " ");
            }
        }
    }
    // Reprimands the player if he does not chose a letter.
    else {
        alert("There are only letters in these words...")
    }


}

//  }
/*    while (lettersleft > 0) {
        document.onkeyup = function(event) {
           var userGuess = event.key.toLowerCase();

        }
    }*/

