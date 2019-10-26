// Creating Global variables to hold the number of Wins, Losses, Lives, an array to hold guessedLetters,
// the Computer's letter selection, and obviously the most important... an array singing the alphabet.
let wins = 0;                   // Number of wins the player has accrued.
let lives = 10;                 // Number of guesses that the player has left.
let guessingWord = [];          // The word that is being displayed/built on as the player guesses.
let guessedLetters = [];        // An array to store the letters that the player has guessed.

let wordToBeGuessed;           // Index of the current word in the array.
let totalLetters = [];
let userGuess;
let lettersLeft;
const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
const animals = [
  "cat", "dog", "hippopotamus", "rhinoceros", "horse", "donkey", "llama", "hoopoe", "labradoodle", "ostrich", "fox", "turaco", "dove",
  "deer", "frigate", "turtle", "homero", "kangaroo", "emu", "eagle", "horse", "tiger", "robin", "bison", "lion", "tapir", "toucan", "takin", "thrush",
  "kouprey", "beaver", "panda", "crane", "okapi", "condor", "yiguirro", "manatee", "trogon", "mouflon", "swan", "tortoiseshell", "swallow", "camel", "oystercatcher", "bear", "perch", "ladybird", "dolphin", "quetzal", "turul", "gyrfalcon", "peafowl", "cobra", "elephant", "komodo", "partridge", "goat", "pheasant", "streamertail", "carp", "wagtail", "stork", "zebu", "lemur", "aurochs", "dodo", "xoloitzcuintli", "jaguar", "grasshopper", "vaquita", "cow", "danphe", "godwit", "kiwi", "oryx", "markhor", "chukar", "crocodile", "falcon", "leopard", "dugong", "vicuna", "carabao", "bison", "lynx", "wolf", "springbok", "galjoen", "magpie", "bull", "junglefowl", "blackbird", "giraffe", "bulldog", "kite", "antelope", "wombat", "shrike", "possum", "cockatoo", "platypus", "kookaburra", "koala", "kangaroo", "hawk", "coati", "anteater", "capybara", "egret", "owl", "raccoon", "chickadee", "beaver", "puffin", "caribou", "osprey", "beluga", "grouse", "moose", "ibis", "gaur", "blackbuck", "squirrel", "myna", "argus", "oriole", "monkey", "starling", "snake", "pangolin", "ox", "donkey", "flamingo", "sheep", "hare", "koi", "orca", "boar", "chihuahua", "urial", "ibex", "yak", "raven", "hedgehog", "dormouse", "otter", "seal", "bat", "fox"
];

// Creating variables that hold the references to the location in the HTML where we want to display things.
let winsTally = document.getElementById("wins-display");
let chosenWord = document.getElementById("word-display");
let guessesLeft = document.getElementById("guesses-left");
let userGuessLog = document.getElementById("guesses-display");

// FUNCTIONS
//======================================================================================================================

const setUp = {
  pickWordAndUpdate: function () {
    wordToBeGuessed = animals[Math.floor(Math.random() * animals.length)];
    console.log(wordToBeGuessed);
    lettersLeft = wordToBeGuessed.length;
    console.log(lettersLeft);
    lives = 10;
    totalLetters = [];
    guessedLetters = [];
    guessingWord = this.buildPlaceHolderWord(wordToBeGuessed);
    this.updateHtml();
  },
  updateHtml: function () {
    winsTally.textContent = wins;
    guessesLeft.textContent = lives;
    userGuessLog.textContent = guessedLetters;
    chosenWord.textContent = guessingWord.join(" ");
  },
  buildPlaceHolderWord: function (word) {
    const array = [];
    for (let i = 0; i < word.length; i++) {
      array[i] = '_'
    }
    console.log(array);
    return array;
  },
  gameWin: function () {
    alert(`Correct! The word was '${wordToBeGuessed}'!`);
    wins++;
    this.pickWordAndUpdate();
  },
  gameLost: function () {
    alert("Oh no! You used all your guesses... let's try with another animal.");
    this.pickWordAndUpdate();
  }
};

const guessHandler = {
  correct: function () {
    for (let j = 0; j < wordToBeGuessed.length; j++) {
      if (wordToBeGuessed[j] === userGuess) {
        guessingWord[j] = userGuess.toUpperCase();
        lettersLeft--;
      }
    }
  },
  incorrect: function () {
    lives--;
    guessedLetters.unshift(` ${userGuess.toUpperCase()} `);
  }
};

const displayAlert = {
  mysteryGuest: function () {
    alert('Ooohhh, a Mystery Guest! Welcome! We respect your anonymity.')
  },
  namedGuest: function (name) {
    alert(`Welcome to the Animal Kingdom, ${name}!`)
  },
  letterHasBeenGuessed: function () {
    alert('You have already guessed that letter...')
  },
  onlyLetters: function () {
    alert('There are only letters in these words...')
  }
};

// GAME OPERATIONS
//======================================================================================================================
let playerName = prompt('Hello! What is your Name?');
if (playerName == null || playerName === "") {
  playerName = 'Anonymous';
  displayAlert.mysteryGuest()
} else {
  displayAlert.namedGuest(playerName)
}

let greetingText = document.getElementById("welcome");
greetingText.textContent = `${playerName}, please guess letters to solve for the animal...`;
;

setUp.pickWordAndUpdate();

document.onkeyup = function (event) {
  if (alphabet.indexOf(event.key) >= 0) {
    userGuess = event.key.toLowerCase();
    console.log(userGuess);
    console.log(totalLetters);
    if ((wordToBeGuessed.indexOf(userGuess) > -1) && (totalLetters.indexOf(userGuess) === -1)) {
      guessHandler.correct();
      setUp.updateHtml();
      totalLetters.unshift(userGuess);
      if (lettersLeft === 0) {
        setUp.gameWin()
      }
    } else if ((wordToBeGuessed.indexOf(userGuess) === -1) && (totalLetters.indexOf(userGuess) === -1)) {
      guessHandler.incorrect();
      setUp.updateHtml();
      totalLetters.unshift(userGuess);
      if (lives === 0) {
        setUp.gameLost()
      }
    } else {
      displayAlert.letterHasBeenGuessed()
    }
  } else {
    displayAlert.onlyLetters()
  }
};
