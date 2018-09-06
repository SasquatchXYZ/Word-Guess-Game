// Creating Global variables to hold the number of Wins, Losses, Lives, an array to hold guessedLetters,
// the Computer's letter selection, and obviously the most important... an array singing the alphabet.
var wins = 0;                   // Number of wins the player has accrued.
var lives = 10;                 // Number of guesses that the player has left.
var guessingWord = [];          // The word that is being displayed/built on as the player guesses.
var guessedLetters = [];        // An array to store the letters that the player has guessed.
var computerChoice;           // Index of the current word in the array.
var totalLetters = [];
var userGuess;
var lettersLeft;
var alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
var animals = [
    "cat","dog","hippopotamus","rhinoceros","horse","donkey","llama","hoopoe","labradoodle","ostrich","fox","turaco","dove",
    "deer","frigate","turtle","homero","kangaroo","emu","eagle","horse","tiger","robin","bison","lion","tapir","toucan","takin","thrush",
    "kouprey","beaver","panda","crane","okapi","condor","yiguirro","manatee","trogon","mouflon","swan","tortoiseshell","swallow","camel","oystercatcher","bear","perch","ladybird","dolphin","quetzal","turul","gyrfalcon","peafowl","cobra","elephant","komodo","partridge","goat","pheasant","streamertail","carp","wagtail","stork","zebu","lemur","aurochs","dodo","xoloitzcuintli","jaguar","grasshopper","vaquita","cow","danphe","godwit","kiwi","oryx","markhor","chukar","crocodile","falcon","leopard","dugong","vicuna","carabao","bison","lynx","wolf","springbok","galjoen","magpie","bull","junglefowl","blackbird","giraffe","bulldog","kite","antelope","wombat","shrike","possum","cockatoo","platypus","kookaburra","koala","kangaroo","hawk","coati","anteater","capybara","egret","owl","raccoon","chickadee","beaver","puffin","caribou","osprey","beluga","grouse","moose","ibis","gaur","blackbuck","squirrel","myna","argus","oriole","monkey","starling","snake","pangolin","ox","donkey","flamingo","sheep","hare","koi","orca","boar","chihuahua","urial","ibex","yak","raven","hedgehog","dormouse","otter","seal","bat","fox"
];

// Creating variables that hold the references to the location in the HTML where we want to display things.
var winsTally = document.getElementById("wins-display");
var chosenWord = document.getElementById("word-display");
var guessesLeft = document.getElementById("guesses-left");
var userGuessLog = document.getElementById("guesses-display");

// FUNCTIONS
//======================================================================================================================
function updateHTML() {
    winsTally.textContent = wins;
    guessesLeft.textContent = lives;
    userGuessLog.textContent = guessedLetters;
    chosenWord.textContent = guessingWord.join(" ");
}

function pickword() {
    computerChoice = animals[Math.floor(Math.random() * animals.length)];
    console.log(computerChoice);
    lettersLeft = computerChoice.length;
    console.log(lettersLeft);
    lives = 10;
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
var player = prompt("Hello! What is your Name?");
if (player == null || player == "") {
    player = "Anonymous";
    alert ("Ooohhh, a Mystery Guest! Welcome! We respect your anonymity.")
} else {
    alert ("Welcome to the Animal Kingdom, " + player + "!");
}

var message = ", please guess letters to solve for the animal...";
var welcome = player + message;
var setGreeting = document.getElementById("welcome");
setGreeting.textContent = welcome;

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
                    }
                } else if ((computerChoice.indexOf(userGuess) === -1) && (totalLetters.indexOf(userGuess) === -1)) {
                    incorrect();
                    updateHTML();
                    totalLetters.unshift(userGuess);
                    if (lives === 0) {
                        alert("Oh no! You used all your guesses... let's try with another animal.");
                        pickword();
                        updateHTML();
                    }
                } else {
                    alert("You have already guessed that letter...")
                }
            } else {
                alert("There are only letters in these words...")
            }
    };
