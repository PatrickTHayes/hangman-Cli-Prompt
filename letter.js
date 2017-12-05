var Letter = function(char) {
    this.state = 0;
    this.alpha = char;
    this.hold = ' _ ';
    this.show = this.hold;
    if (isLetter(char)) {
        //if it is a letter and this is true, were all set
    }
    else { //if it isn't a letter, show it. (handle non latin alphabet characts in answer)
        this.state = 1
        this.show = this.alpha
    }


}

Letter.prototype.check = function(x) {
    if (this.alpha === x) {
        this.show = this.alpha;
        this.state = 1;
    }

}

function isLetter(str) {
    return str.length === 1 && str.match(/[a-z]/i); //truthy falsey return if it is a basic latin letter
}
module.exports = Letter;

//var test = new Letter('z');
