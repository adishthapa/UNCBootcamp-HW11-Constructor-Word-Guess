var Letter = require("./Letter.js");

function Word(word) {
    this.word = [],
    this.createWord = function() {
        for (var i = 0; i < word.length; i++) {
            var letter = new Letter(word[i]);
            this.word.push(letter);
        };
    },
    this.returnWord = function() {
        var s = "";
        for (var i = 0; i < word.length; i++) {
            s += this.word[i].display() + " ";
        };
        return s;
    },
    this.updateWord = function(char) {
        for (var i = 0; i < this.word.length; i++) {
            this.word[i].updateGuessed(char);
        };
    };
};

module.export = Word;