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
        if (char === this.letter) {
            this.guessed = true;
            return true;
        } else {
            return false;
        };
    };
};

module.exports = Letter;