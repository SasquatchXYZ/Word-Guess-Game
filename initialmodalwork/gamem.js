// Creating Global variables to hold the number of Wins, Losses, Lives, an array to hold guessedLetters,
// the Computer's letter selection, and obviously the most important... an array singing the alphabet.
var wins = 0;                   // Number of wins the player has accrued.
var lives = 10;                 // Number of guesses that the player has left.
var guessingWord = [];          // The word that is being displayed/built on as the player guesses.
var guessedLetters = [];        // An array to store the letters that the player has guessed.
var livesLeft;                // How many tries the player has left.
var computerChoice;           // Index of the current word in the array.
var totalLetters = [];
var userGuess;
var player;
var lettersLeft;
var alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
var animals = [
    "cat","dog","hippopotamus","rhinoceros","horse","donkey","llama","hoopoe","labradoodle","ostrich","fox","turaco","dove",
    "deer","frigate","turtle","homero","kangaroo","emu","eagle","horse","tiger","robin","bison","lion","tapir","toucan","takin","thrush",
    "kouprey","beaver","panda","crane","okapi","condor","yiguirro","manatee","trogon","mouflon","swan","tortoiseshell",
];
/*var gameStarted = false;
var gameFinished = false;*/

// Creating variables that hold the references to the location in the HTML where we want to display things.
var winsTally = document.getElementById("wins-display");
var chosenWord = document.getElementById("word-display");
var guessesLeft = document.getElementById("guesses-left");
var userGuessLog = document.getElementById("guesses-display");

// FUNCTIONS
//======================================================================================================================
function resetGame () {
    livesLeft = lives;

    var computerChoice = animals[Math.floor(Math.random() * animals.length)];
    console.log(computerChoice);
    var lettersLeft = computerChoice.length;
    console.log(lettersLeft);

    guessedLetters = [];
    guessingWord = [];
    for (var i = 0; i < computerChoice.length; i++) {
        guessingWord[i] = "_";
    }
    updateHTML();
}

function updateHTML() {
    winsTally.textContent = player + "'s Wins: " + wins;
    guessesLeft.textContent = "Guesses Remaining " + lives;
    userGuessLog.textContent = "Guessed Letters: " + guessedLetters;
    chosenWord.textContent = "[ " + guessingWord.join(" ") + " ]";
}

function pickword() {
    computerChoice = animals[Math.floor(Math.random() * animals.length)];
    console.log(computerChoice);
    lettersLeft = computerChoice.length;
    console.log(lettersLeft);

    totalLetters = [];
    guessedLetters = [];
    guessingWord = [];
    for (var i = 0; i < computerChoice.length; i++) {
        guessingWord[i] = "_";
    }
}

function correct () {
    for (var j = 0; j < computerChoice.length; j++) {
        if (computerChoice[j] === userGuess) {
            guessingWord[j] = userGuess.toUpperCase();
            lettersLeft--;
        }
    }
}

function incorrect() {
    lives--;
    guessedLetters.unshift(" " + userGuess.toUpperCase() + " ");
}

// GAME OPERATIONS
//======================================================================================================================
/*function gameStart() {
    computerChoice = animals[Math.floor(Math.random() * animals.length)];
    console.log(computerChoice);
    lettersLeft = computerChoice.length;
    console.log(lettersLeft);
    computerChoiceArray = [];
    for (var h = 0; h < computerChoice.length; h++) {
        computerChoiceArray[h] = computerChoice[h];
    }
    console.log(computerChoiceArray);

    guessedLetters = [];
    guessingWord = [];
    for (var i = 0; i < computerChoice.length; i++) {
        guessingWord[i] = "_";
    }
    winsTally.textContent = "Wins: " + wins;
    guessesLeft.textContent = "Guesses Remaining " + lives;
    userGuessLog.textContent = "Guessed Letters: " + guessedLetters;
    chosenWord.textContent = "[ " + guessingWord.join(" ") + " ]";
}
gameStart();*/

// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var modalbtn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// Get the Submit button on the modal
var submitbtn = document.getElementsByClassName("btn btn-info");

// When the user clicks on the button, open the modal
modalbtn.onclick = function() {
    modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
};
//
submitbtn.onclick = function() {
    var player = document.getElementById("inputName");
    modal.style.display = "none";
    console.log(player)
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};


/*var player = prompt("Hello! What is your Name?");
if (player == null || player == "") {
    player = "Anonymous";
    alert ("Ooohhh, a Mystery Guest! Welcome! We respect your anonymity.")
} else {
    alert ("Welcome to the Zoo " + player + "!");
}*/


pickword();
updateHTML();
document.onkeyup = function (event) {
    if (alphabet.indexOf(event.key) >= 0) {
        userGuess = event.key.toLowerCase();
        console.log(userGuess);
        console.log(totalLetters);
        if ((computerChoice.indexOf(userGuess) > -1) && (totalLetters.indexOf(userGuess) === -1)) {
            correct();
            updateHTML();
            totalLetters.unshift(userGuess);
            if (lettersLeft === 0) {
                alert("Correct! The word was '" + computerChoice + "'!");
                wins++;
                pickword();
                updateHTML();
            } else {

            }
        } else if ((computerChoice.indexOf(userGuess) === -1) && (totalLetters.indexOf(userGuess) === -1)) {
            incorrect();
            updateHTML();
            totalLetters.unshift(userGuess);
            if (lives === 0) {
                alert("Oh no! You used all your guesses... let's try with another animal.");
                pickword();
                updateHTML();
            } else {

            }
        } else {
            alert("You have already guessed that letter...")
        }
    } else {
        alert("There are only letters in these words...")
    }
};
