var Word = require("./word.js");

var Phrase = function(str) {
    var phraseArrayTemp = str.split(' '); //split by spaces
    this.state = 0;
    this.phrase = str;
    this.phraseArray = [];
    for (var i = 0; i < phraseArrayTemp.length; i++) {
        this.phraseArray.push(new Word(phraseArrayTemp[i])); //push each word into the array as new words
    }

}
Phrase.prototype.check = function(char) { // function gets passed a guess letter, goes through, changes all matching states to 1.
    var wordRevealed = 1;

    for (var k = 0; k < this.phraseArray.length; k++) {

        this.phraseArray[k].check(char); //From word.js, run check on the character
        if (this.phraseArray[k].state === 0) {

            wordRevealed = 0;
            //console.log('not all words are revealed yet');
        }
    }
    if (wordRevealed === 1) {
        this.state = 1; //game win
        return (true);
    }
}
module.exports = Phrase;
