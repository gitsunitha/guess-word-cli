function Letter(letterValue) {
    this.letterValue = letterValue.toLowerCase();

    this.guessed = false;

    this.isGuessed = function(guessedValue) {
        if (guessedValue === letterValue) {
            this.guessed = true;
        }
    };

    this.showLetter = function() {
        if (this.guessed) {
            return this.letterValue + " ";
        } else {
            if (/^[A-Za-z]{1,1}$/.test(this.letterValue)) {
                return "_ ";
            } else {
                this.guessed = true;
                //non alpa chars need to be set to true since they are not guessed
                return this.letterValue + " ";
            }
        }
    };
}

module.exports = Letter;