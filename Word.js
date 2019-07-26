var Letter = require("./Letter.js");

function Word(word) {
    this.word = [],
    this.totalGuessed = 0,
    this.createWord = function() {
        for (var i = 0; i < word.length; i++) {
            if (word[i] === " ") {
                this.totalGuessed++;
            }
            var letter = new Letter(word[i]);
            this.word.push(letter);
        };
    },
    this.toString = function() {
        var s = "";
        s = this.word.join(" ");
        return s;
    },
    this.updateWord = function(char) {
        var status = false;
        for (var i = 0; i < this.word.length; i++) {
            var guess = this.word[i].updateGuessed(char);
            if (guess) {
                this.totalGuessed++;
                status = true;
            };
        };
        return status;
    };
};

module.exports = Word;