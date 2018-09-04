// Creating Global variables to hold the number of Wins, Losses, Lives, an array to hold guessedLetters,
// the Computer's letter selection, and obviously the most important... an array singing the alphabet.
var wins = 0;                   // Number of wins the player has accrued.
var lives = 12;                 // Number of guesses that the player has left.
var guessingWord = [];          // The word that is being displayed/built on as the player guesses.
var guessedLetters = [];        // An array to store the letters that the player has guessed.
var livesLeft;                // How many tries the player has left.
var computerChoice;           // Index of the current word in the array.
/*var computerChoice;*/
var alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
var animals = [
    "cat","dog","hippopotamus","rhinoceros","horse","donkey","llama","hoopoe","labradoodle","ostrich"
];
var gameStarted = false;
var gameFinished = false;

// Creating variables that hold the references to the location in the HTML where we want to display things.
var winsTally = document.getElementById("wins-display");
var chosenWord = document.getElementById("word-display");
var guessesLeft = document.getElementById("guesses-left");
var userGuessLog = document.getElementById("guesses-display");

/*winsTally.textContent = "Wins: " + wins;
guessesLeft.textContent = "Guesses Remaining " + lives;
userGuessLog.textContent = "Guessed Letters: " + guessedLetters;*/

// FUNCTIONS
//======================================================================================================================
function resetGame () {
    livesLeft = lives;
    gameStarted = false;

    computerChoice = animals[Math.floor(Math.random() * animals.length)];
    console.log(computerChoice);

    guessedLetters = [];
    guessingWord = [];
    for (var i = 0; i < computerChoice.length; i++) {
        guessingWord[i] = "_";
    }

    updateHTML();
    //guessesLeft.textContent = "Guesses Remaining " + lives;
    //userGuessLog.textContent = "Guessed Letters: " + guessedLetters;
    /*    var word = [];

        var lettersleft = computerChoice.length;
        console.log(lettersleft);
        chosenWord.textContent = "[ " + word.join(" ") + " ]";*/
}

function updateHTML() {
    winsTally.textContent = "Wins: " + wins;
    guessesLeft.textContent = "Guesses Remaining " + lives;
    userGuessLog.textContent = "Guessed Letters: " + guessedLetters;
    chosenWord.textContent = "[ " + guessingWord.join(" ") + " ]";

    /*    var lettersleft = computerChoice.length;
        console.log(lettersleft);*/
    gameFinished = true;
}
/*    var computerChoice = animals[Math.floor(Math.random() * animals.length)];
        console.log(computerChoice);
        var word = [];
            for (var i = 0; i < computerChoice.length; i++) {
                word[i] = "_";
            }*/


function pickword() {
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

// GAME OPERATIONS
//======================================================================================================================
/*gameStart();
// pickword();
 //   while (lettersleft > 0) {
var computerChoice = animals[Math.floor(Math.random() * animals.length)];
console.log(computerChoice);
var word = [];
for (var i = 0; i < computerChoice.length; i++) {
    word[i] = "_";
}
var lettersleft = computerChoice.length;
console.log(lettersleft);
chosenWord.textContent = "[ " + word.join(" ") + " ]";*/

document.onkeyup = function(event) {
    if(gameFinished) {
        resetGame();
        gameFinished = false;
    }
    else {
        if(alphabet.indexOf(event.key) >= 0) {
            userGuess(event.key.toLowerCase());
        }
        else {
            alert("there are only letters in these words...")
        }
    }
};

function userGuess(letter) {
    if (livesLeft > 0) {
        if (!gameStarted) {
            gameStarted = true;
        }
        if (guessedLetters.indexOf(letter) === -1) {
            guessedLetters.push(letter);
            evaluateUserGuess(letter);
        }
    }
    updateHTML();
    checkWin();
};

function evaluateUserGuess(letter) {
    var letterPositions = [];
    for (var j = 0; j < computerChoice.length; j++) {
        if (computerChoice[j] === letter) {
            letterPositions.push(j);
            if (letterPositions.length <= 0) {
                livesLeft--;
            } else {
                for (var k = 0; k < letterPositions.length; k++){
                    guessingWord[letterPositions[k]] = letter;
                }
            }
        }
    }
};

function checkWin() {
    if (guessingWord.indexOf("_") === -1) {
        wins++;
        gameFinished = true;
    }
};
/*            userGuess = event.key.toLowerCase();
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
                }*/



//  }
/*    while (lettersleft > 0) {
        document.onkeyup = function(event) {
           var userGuess = event.key.toLowerCase();

        }
    }*/

