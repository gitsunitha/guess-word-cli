// Load the NPM Packages and dependencies
var inquirer = require("inquirer");
//var rxjs = require('rxjs');
var Word = require("./Word.js");
var wordlist = require("./wordlist.js");

async function askNewLetter(wordUsed) {
    while (!wordUsed.isComplete()) {
        var response = await inquirer.prompt([{
            type: "input",
            message: "Guess a letter",
            name: "inputLetter",
            default: true,
        }, ]);
        //check if value correct
        if (response.inputLetter) {
            if (!wordUsed.validateGuess(response.inputLetter.trim().toLowerCase())) {
                console.log("Oops not correct !! try again!!");
            } else {
                console.log("Correct !! try one more!");
            }
            wordUsed.wordDisplay();
        }
    } //end for
}

async function guessWordGame() {
    var exitLoop = false;
    while (!exitLoop) {
        var inquirerAnswer = await inquirer.prompt([{
            type: "confirm",
            message: "Do you want to play the word guess game",
            name: "confirm",
            default: true,
        }, ]);
        if (inquirerAnswer.confirm) {
            console.log("\nWelcome to the word game");

            //if yes select a random word from the list
            wordToGuess = wordlist.guessRandomWord();
            //display the word with hidden letters
            newWord = new Word(wordToGuess);

            newWord.wordArrayBuilder();
            newWord.wordDisplay();
            await askNewLetter(newWord);
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