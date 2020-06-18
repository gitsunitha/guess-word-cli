var Letter = require("./Letter.js");

// Create a new TV object

function Word(inputValue) {
    this.wordValue = inputValue.toLowerCase();
    this.wordArray = [];
    this.wordArrayBuilder = function() {
        this.wordArray = [];
        for (let index = 0; index < this.wordValue.length; index++) {
            var l1 = new Letter(this.wordValue[index]);
            this.wordArray.push(l1);
        }
    };
    this.wordDisplay = function() {
        var displayStr = "";
        this.wordArray.forEach((element) => {
            displayStr += element.showLetter();
        });
        console.log(displayStr);
    };
    this.validateGuess = function(letterGuessed) {
        if (this.wordValue.includes(letterGuessed.toLowerCase())) {
            this.wordArray.forEach((element) => {
                if (!element.guessed &&
                    element.letterValue.toLowerCase() === letterGuessed.toLowerCase()
                ) {
                    element.guessed = true;
                }
            });

            return true;
        } else {
            return false;
        }
    };
    this.isComplete = function() {
        //walk through the array and if any one is not guessed
        //return false
        //else return true
        returnValue = true;
        this.wordArray.forEach((element) => {
            if (!element.guessed) {
                returnValue = false;
            }
        });
        return returnValue;
    };
}

module.exports = Word;