// Constructor for the Letter Object
function Letter(letter) {
    this.letter = letter,
    this.guessed = false,
    this.toString = function() {
        if (this.letter === " ") {
            return " "
        } else if (this.guessed) {
            return this.letter;
        } else {
            return "_";
        };
    },
    this.updateGuessed = function(char) {
        if (char.toLowerCase() === this.letter.toLowerCase()) {
            this.guessed = true;
            return true;
        } else {
            return false;
        };
    };
};

// Exports Letter
module.exports = Letter;