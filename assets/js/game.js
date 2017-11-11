var hangmanGame = {
    "words": [
        "archery", "basketball", "boxing", "hockey", "tennis", "wrestling", "gymnastics", "shooting", "swimming", "fencing",
    ],
    "alphabet": [
        "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"
    ],
    "letters_guessed": [],
    "wins": 0,
    "losses": 0,
    "guesses_remaining": 0,
    "letters_remaining": 0,
    "current_word": "",
    "masked_word": "",
    initializeGame: function () {
        document.getElementById("user-wins").textContent = this.wins;
        document.getElementById("user-losses").textContent = this.losses;

        this.current_word = this.words[Math.floor(Math.random() * this.words.length)];
        this.letters_remaining = this.current_word.length;
        this.guesses_remaining = this.current_word.length + 3;

        document.getElementById("guesses-remaining").textContent = this.guesses_remaining;

        for (var i = 0; i < this.current_word.length; i++) {
            this.masked_word += "-";
        }

        document.getElementById("hangman-word").textContent = this.masked_word;
    },
    newRound: function () {
        this.masked_word = "";
        this.current_word = this.words[Math.floor(Math.random() * this.words.length)];
        this.letters_remaining = this.current_word.length;
        this.guesses_remaining = this.current_word.length + 3;
        this.letters_guessed = [];
        document.getElementById("letters-guessed").textContent = this.letters_guessed.toString();
        document.getElementById("guesses-remaining").textContent = this.guesses_remaining;

        for (var i = 0; i < this.current_word.length; i++) {
            this.masked_word += "-";
        }

        document.getElementById("hangman-word").textContent = this.masked_word;
    },
    recordWin: function () {
        this.wins++;
        document.getElementById("user-wins").textContent = this.wins;
        this.newRound();
    },
    recordLoss: function () {
        this.losses++;
        document.getElementById("user-losses").textContent = this.losses;
        this.newRound();
    },
    recordCorrectGuess: function (letter) {
        for (var i = 0; i < this.current_word.length; i++) {
            if (letter === this.current_word.charAt(i) && this.masked_word.charAt(i) === "-") {
                this.masked_word = this.masked_word.substring(0, i) + letter + this.masked_word.substring(i + 1, this.masked_word.length);
                this.letters_remaining--;
            }
        }
        document.getElementById("hangman-word").textContent = this.masked_word;
    },
    recordIncorrectGuess: function (letter) {
        this.guesses_remaining--;
        this.letters_guessed.push(letter);
        document.getElementById("guesses-remaining").textContent = this.guesses_remaining;
        document.getElementById("letters-guessed").textContent = this.letters_guessed.toString();
    }
};

hangmanGame.initializeGame();

document.onkeyup = function (event) {
    var keyPressed = event.key;

    if (hangmanGame.alphabet.indexOf(keyPressed) >= 0 && hangmanGame.letters_guessed.indexOf(keyPressed) < 0) {
        if (hangmanGame.current_word.indexOf(keyPressed) >= 0) {
            hangmanGame.recordCorrectGuess(keyPressed);

            if (hangmanGame.letters_remaining === 0) {
                hangmanGame.recordWin();
            }
        }
        else {
            hangmanGame.recordIncorrectGuess(keyPressed);

            if(hangmanGame.guesses_remaining === 0){
                hangmanGame.recordLoss();
            }
        }
    }
}