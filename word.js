var Letter = require("./letter.js");

var Word = function(wordChar) { //A word is passed into the function, it creates a word with that value and and array of letters
    var wordArrayTemp = wordChar.split('');
    this.state = 0;
    this.word = wordChar;
    this.letterArray = [];
    for (var i = 0; i < wordArrayTemp.length; i++) {
        this.letterArray.push(new Letter(wordArrayTemp[i]));
    }


}
var isRevealed = 1;
Word.prototype.check = function(char) { //change state if all letters have been shown (state===1)
    isRevealed = 1;

    for (var j = 0; j < this.letterArray.length; j++) {
        this.letterArray[j].check(char); //check the letter passed at each position in the word.
        if (this.letterArray[j].state === 0) { // if any letter isn't revealed, change swith variable
            isRevealed = 0

        }
    }
    if (isRevealed === 1) { // if no letters changed the switch, change the state.
        this.state = 1;
    }

}


module.exports = Word;
