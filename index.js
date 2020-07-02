// Load the NPM Packages and dependencies
var inquirer = require("inquirer");
//var rxjs = require('rxjs');
var Word = require("./Word.js");
var wordlist = require("./wordlist.js");

async function askNewLetter(wordUsed, numberOfTries) {
    while (!wordUsed.isComplete() && numberOfTries > 0) {
        var messageDisplay =
            "You have " + numberOfTries + " attempts left. Guess a letter";
        var response = await inquirer.prompt([{
            type: "input",
            message: messageDisplay,
            name: "inputLetter",
            default: true,
        }, ]);
        //check if value correct
        if (response.inputLetter) {
            if (!wordUsed.validateGuess(response.inputLetter.trim().toLowerCase())) {
                if (numberOfTries > 1) {
                    console.log("Oops not correct !! try again!!");
                }
            } else {
                if (numberOfTries > 1) {
                    console.log("Correct !! try one more!");
                }
            }
            wordUsed.wordDisplay();

            numberOfTries--;
            if (wordUsed.isComplete()) {
                console.log("*************************");
                console.log("Yay!!! you did it");
                console.log("*************************");
                continue;
            }
            if (numberOfTries === 0) {
                console.log("*************************");
                console.log(
                    "Oops you exceeded the number of tries!! Better luck next time"
                );
                console.log("The word was : " + wordUsed.wordValue);
                console.log("*************************");
                continue;
            }
        }
    } //end for
}

async function guessWordGame() {
    var exitLoop = false;
    var numberofGuesses = 10; //default value

    var messTodisplay =
        "*****************************\n" +
        "Welcome to the Word Game \n\n" +
        " Would you like to like to play the mind numbingly brilliant word game? \n" +
        "**************************\n";
    while (!exitLoop) {
        var inquirerAnswer = await inquirer.prompt([{
            type: "confirm",
            message: messTodisplay,
            name: "confirm",
            default: true,
        }, ]);
        if (inquirerAnswer.confirm) {
            console.log("****************************************************");
            console.log("\nHere goes ");
            console.log("****************************************************");

            //if yes select a random word from the list
            var wordToGuess = wordlist.guessRandomWord();
            //calculate the number of allowed guesses
            numberofGuesses = Math.floor(wordToGuess.length * 1.5);
            //display the word with hidden letters
            newWord = new Word(wordToGuess);

            newWord.wordArrayBuilder();
            newWord.wordDisplay();
            await askNewLetter(newWord, numberofGuesses);
            messTodisplay =
                "\n ************************************\n" +
                "Ah Well ! Here we are .. Want to play again?\n" +
                "**********************************************";
        } else {
            //if no exit the word game
            console.log("\nThat's okay , come again when you want to play.\n");
            exitLoop = true;
        }
    } //while loop
} //function guessWordGame

guessWordGame();
//     exit();
// }