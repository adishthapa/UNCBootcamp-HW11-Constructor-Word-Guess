// Required packages/files
var Word = require("./Word.js");
var inquirer = require("inquirer");
var chalk = require('chalk');

// Array of movies for the Hangman Game
var movies = ["The Godfather", "The Shawshank Redemption", "Pulp Fiction", "The Matrix", "Saving Private Ryan", "Gladiator", "Braveheart", "The Departed", "The Big Lebowski", "No Country for Old Men"];
// Initializes some of the required variables
var totalWords, word, totalLetters, guessedLetters, guessesAllowed;

// Function that shuffles the given array
var shuffle =  function(arr) {
    for (var i = arr.length - 1; i > 0; i--) {
        var randomNum = Math.floor(Math.random() * (i + 1));
        var current = arr[i];
        arr[i] = arr[randomNum];
        arr[randomNum] = current;
    }
    return arr;
}

// Function that starts the game
var start = function() {
    // First it shuffles the movies array
    shuffle(movies);
    // Then it sets the total Words guessed so far to 0
    totalWords = 0;
    // Then it creates a new Word Object for the first movie in the array
    word = new Word(movies[totalWords]);
    // Then it turns each of the Letter in the Word Object into a Letter Object
    word.createWord();
    // Then it gets the length of the array containing all the Letter Objects
    totalLetters = word.word.length;
    // Then it sets the array of guessed Letters so far to empty
    guessedLetters = [];
    // Then it sets the total Guesses allowed as 7
    guessesAllowed = 7;
    
    // Then it prints out the direction for the Game
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

    // Finally, it starts the Game
    guess();
}

// Function that keeps track of Guessing
var guess = function() {
    //Prompts the User to Guess a Letter
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
            // Checks to see if the User entered a valid Letter or not
            if (letter.length !== 1 || letter.toUpperCase() === letter.toLowerCase()) {
                console.log(chalk.red("\n\nPLEASE ONLY ENTER A SINGLE ALPHABETICAL LETTER!!!\n"));
                console.log(word.toString() + "\n\n");
                guess();
            // Checks to see if the User already guessed the Letter or not
            } else if (guessedLetters.indexOf(letter) === -1) {
                guessedLetters.push(letter);
                
                // Checks whether the User guessed the correct Letter or not
                var status = word.updateWord(letter);
                if (status) {
                    console.log(chalk.green("\n\nCORRECT!!!\n"))
                } else {
                    guessesAllowed--;
                    console.log(chalk.red("\n\nINCORRECT!!!\n"))
                    console.log(chalk.bold(guessesAllowed) + " Guesses Remaining!!!\n");
                };
    
                console.log(word.toString() + "\n\n");
    
                // Checks to see if the User guessed the complete Word or not
                if (totalLetters !== word.totalGuessed) {
                    // Checks to see if the User can keep Guessing or not
                    if (guessesAllowed !== 0) {
                        guess();
                    } else {
                        console.log(chalk.redBright.bold("Oh no! That was your last guess available.\n\n"))
                        retry();
                    }
                } else {
                    // Checks to see if the User has any more words left to Guess or not
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

// Function that restarts the Game
var retry = function() {
    //Prompts the User to Restart the Game
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
            // Checks to see if the User wants to Restart the Game or not
            if (answers.retry) {
                console.log("\n");
                start();
            } else {
                console.log(chalk.blue.bold("\n\nThanks for playing! Please come again!\n\n"));
            }
        });
}

// Starts the Game
start();