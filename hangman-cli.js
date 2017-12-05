var Phrase = require("./phrase.js");

var prompt = require('prompt');
var colors = require('colors/safe');

newGame();

function newGame() {
    prompt.start();
    var property = {
        name: 'yesno',
        message: 'Would you like to play a new game?',
        validator: /y[es]*|n[o]?/,
        warning: 'Must respond yes or no',
        default: 'no'
    };

    prompt.get(property, function(err, result) {
        if (result.yesno === 'yes') {
            remainingGuesses = 10;
            console.log(colors.blue("Let us begin!"))
            playGame();
        }
    });
}
var currentPhrase;
var remainingGuesses = 10;

function playGame() {
    currentPhrase = choosePhrase(); //get a phrase created by our constructors
    display(currentPhrase); //display our phrase
    guess(currentPhrase);
}

function guess(currentPhrase) {
    var schema = {
        properties: {
            guess: {
                pattern: /^[a-zA-Z]+$/,
                message: 'Your guess has to be letters',
                required: true
            }
        }
    };
    prompt.start();
    prompt.get(schema, function(err, result) {
        var firstChar = result.guess.charAt(0); //grab only first character if they put in a longer string
        if (currentPhrase.check(firstChar) === true) { //checks letters and checks for win on return value
            display(currentPhrase);
            console.log(colors.magenta("You win"));
            newGame();
        }
        else { //if there isn't a win
            if (wrong(firstChar, currentPhrase) === true) { //checks wrong function to see if the guess is incorrect
                remainingGuesses--; //if so lower remaining guesses
                console.log(colors.red("wrong guess, try something else"));
            }
            else { //wrong came back false
                console.log(colors.green("Good guess, keep going!"));
            }
            if (remainingGuesses > 0) { //if guesses are still above 0 guess again
                display(currentPhrase);
                guess(currentPhrase);
            }
            else if (remainingGuesses === 0) { //if guesses hits 0 go back to new game
                console.log(colors.magenta("You Lose"));
                newGame();
            }

        }
    })
}

function wrong(guess, phrase) {
    var wrongGuess = true;
    for (var i = 0; i < phrase.phraseArray.length; i++) {
        for (var j = 0; j < phrase.phraseArray[i].letterArray.length; j++) {
            if (guess === phrase.phraseArray[i].letterArray[j].alpha) {
                wrongGuess = false;
            }
        }

    }
    return wrongGuess;
}

function display(phrase) {
    var displayString = 'Remaining Guesses: ' + remainingGuesses;
    for (var i = 0; i < phrase.phraseArray.length; i++) {
        displayString = displayString + '       '; // spacing between words
        for (var j = 0; j < phrase.phraseArray[i].letterArray.length; j++) {
            displayString = displayString + phrase.phraseArray[i].letterArray[j].show;
        }
    }
    console.log(colors.green(displayString));
}

function choosePhrase() { //choose randomly. create a phrase, return phrase.
    var x = Math.floor(Math.random() * phraseList.length)
    var test = new Phrase(phraseList[x]);
    return (test);
}

var phraseList = ['alpine slopes', 'meandering tourists', 'hot potatoe', 'potent potables', 'who reads', 'andre the giant'];
