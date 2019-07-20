function Letter(letter) {
    this.letter = letter;
    this.guessed = false;
    this.display = function() {
        if (this.guessed) {
            return letter;
        } else {
            return "_";
        };
    };
    this.updateGuessed = function(char) {
        if (char === this.letter) {
            this.guessed = true;
        };
    };
};