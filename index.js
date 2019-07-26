var Word = require("./Word.js");
var inquirer = require("inquirer");
var chalk = require('chalk');

var movies = ["The Godfather", "The Shawshank Redemption", "Pulp Fiction", "The Matrix", "Saving Private Ryan", "Gladiator", "Braveheart", "The Departed", "The Big Lebowski", "No Country for Old Men"];
var totalWords, word, totalLetters, guessedLetters, guessesAllowed;

var shuffle =  function(arr) {
    for (var i = arr.length - 1; i > 0; i--) {
        var randomNum = Math.floor(Math.random() * (i + 1));
        var current = arr[i];
        arr[i] = arr[randomNum];
        arr[randomNum] = current;
    }
    return arr;
}

var start = function() {
    shuffle(movies);
    totalWords = 0;
    word = new Word(movies[totalWords]);
    word.createWord();
    totalLetters = word.word.length;
    guessedLetters = [];
    guessesAllowed = 7;
    
    console.log(chalk.blue("+---------------------------------------------------------------------------------------+"));
    console.log(chalk.blue("|                                                                                       |"))
    console.log(chalk.blue("| Welcome to the", chalk.underline.bold("Movies"), "Themed Hangman Game!                                            |"));
    console.log(chalk.blue("|                                                                                       |"))
    console.log(chalk.blue("| Your goal is to correctly identify all " + movies.length + " movies in this game.                         |"));
    console.log(chalk.blue("| You have up to 7 tries per movie to guess it right!                                   |"));
    console.log(chalk.blue("|                                                                                       |"))
    console.log(chalk.blue("| If you fail to guess it within 7 tries,                                               |"));
    console.log(chalk.blue("| you will have the option to restart the game with randomized Movie order.             |"));
    console.log(chalk.blue("|                                                                                       |"))
    console.log(chalk.blue("| Good luck!!!                                                                          |"));
    console.log(chalk.blue("|                                                                                       |"))
    console.log(chalk.blue("+---------------------------------------------------------------------------------------+\n"));
    console.log(chalk.yellow.bold("Movie #" + (totalWords + 1)+ "\n"));
    console.log(chalk.bold(word.toString() + "\n\n"));

    
    guess();
}

var guess = function() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "letter",
                message: "Guess a letter: "
            }
        ])
        .then(answers => {
            var letter = answers.letter;

            if (guessedLetters.indexOf(letter) === -1) {

                guessedLetters.push(letter);
                
                var status = word.updateWord(letter);

                if (status) {
                    console.log(chalk.green("\n\nCORRECT!!!\n"))
                } else {
                    guessesAllowed--;
                    console.log(chalk.red("\n\nINCORRECT!!!\n"))
                    console.log(chalk.bold(guessesAllowed) + " Guesses Remaining!!!\n");
                };
    
                console.log(word.toString() + "\n\n");
    
                if (totalLetters !== word.totalGuessed) {
                    if (guessesAllowed !== 0) {
                        guess();
                    } else {
                        console.log(chalk.redBright.bold("Oh no! That was your last guess available.\n\n"))
                        retry();
                    }
                } else {
                    if (totalWords !== (movies.length - 1)) {
                        totalWords++;
                        word = new Word(movies[totalWords]);
                        word.createWord();
                        totalLetters = word.word.length;
                        guessedLetters = [];
                        guessesAllowed = 7;
                        console.log(chalk.green("YAY!!! You got it right! Next movie!\n\n"));
                        console.log(chalk.yellow.bold("Movie #" + (totalWords + 1)+ "\n"));
                        console.log(chalk.bold(word.toString() + "\n\n"));
                        guess();
                    } else {
                        console.log(chalk.greenBright.bold("Congrats! You have succeeded in guessing all of the Movies correctly!!!\n\n"));
                    }
                    
                }

            } else {

                console.log(chalk.red("\n\nYOU ALREADY GUESSED " + letter.toUpperCase() + "!!!\n"))
                console.log(word.toString() + "\n\n");
                guess();

            }
            
        });
};

var retry = function() {
    inquirer
        .prompt([
            {
                type: "confirm",
                name: "retry",
                message: "Would you like to try again? ",
                default: true
            }
        ])
        .then(answers => {
            if (answers.retry) {
                console.log("\n");
                start();
            } else {
                console.log(chalk.blue.bold("\n\nThanks for playing! Please come again!\n\n"));
            }
        });
}

start();