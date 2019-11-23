




class Game {
    constructor() {
        this.canvas = document.querySelector(".canvas");
        this.lettersBox = document.querySelector(".letters");
        this.searchingText = document.querySelector(".text");
        this.availableAttempts = document.querySelector(".attempts");
        this.categoryBox = document.querySelector(".category");
        this.buttonStartGame = document.querySelector(".start-game");
        this.randomDigit;
        this.attempts = 5;
        this.questions = ['adam małysz', 'król lew', 'pies który jeździł koleją', 'brzydkie kaczątko', 'Fiat', 'piłkna nożna', 'super mario', 'talerz'];
        this.category = ['Polscy sportowcy', 'Tytuł bajki', 'Tytuł książki', 'Postać z bajki', 'Marka samochodu', 'Kategoria sportowa', 'Postać z gry', 'Przedmiot kuchenny'];
        this.randomQuestion = '';
        this.confrimLetter = 0;
        this.createLetters();
        this.addLettersDisabled();
        this.buttonStartGame.addEventListener('click', () => this.startGame());
        // this.buttonStartGame.addEventListener('touchend', () => this.startGame());
    }
    drawHangman() {
        if (this.attempts === 4) {
            const base = document.createElement('span');
            base.classList.add('base');
            this.canvas.appendChild(base);
        }
        if (this.attempts === 3) {
            const column = document.createElement('span');
            column.classList.add('column');
            this.canvas.appendChild(column);
        }

        if (this.attempts === 2) {
            const branch = document.createElement('span');
            branch.classList.add('branch');
            this.canvas.appendChild(branch);
        }

        if (this.attempts === 1) {
            const rope = document.createElement('span');
            rope.classList.add('rope');
            this.canvas.appendChild(rope);
        }
        if (this.attempts === 0) {
            const man = document.createElement('div');
            const hangmanImg = document.createElement('img');
            hangmanImg.src = "./hangman.png";
            hangmanImg.alt = 'hangman';
            man.appendChild(hangmanImg);
            man.classList.add('man');
            this.canvas.appendChild(man);
        }



    }
    clearCanvas() {
        this.canvas.textContent = '';
    }
    createLetters = () => {
        const letters = ['a', 'ą', 'b', 'c', 'ć', 'd', 'e', 'ę', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'ł', 'm', 'n', 'ń', 'o', 'ó', 'p', 'q', 'r', 's', 'ś', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'ź', 'ż'];
        letters.forEach((letter) => {
            const button = document.createElement('button');
            button.classList.add('letter');
            button.textContent = letter.toUpperCase();
            button.addEventListener('click', () => {
                button.classList.add('cliked');
                this.checkLetter(button);
                button.disabled = true;
            })
            button.addEventListener('touchend', () => {
                button.classList.add('cliked');
                this.checkLetter(button);
                button.disabled = true;
            })

            this.lettersBox.appendChild(button);
        })
    }
    drawBar(howMany) {

        for (let i = 0; i < howMany; i++) {
            const sentenceEl = document.createElement('div');
            sentenceEl.classList.add('sentenceEl');
            this.searchingText.appendChild(sentenceEl);
        }
    }
    checkLetter(btn) {

        const clikedLetter = btn.textContent;
        const questionLetters = [...this.randomQuestion.toUpperCase()];
        if (questionLetters.indexOf(clikedLetter) !== -1) {
            for (let i = 0; i < questionLetters.length; i++) {
                if (questionLetters[i] === clikedLetter) {
                    this.searchingText.querySelectorAll('.sentenceEl')[i].innerHTML = clikedLetter;
                    this.confrimLetter++;
                    this.winGame();
                }
            }
        } else {
            this.attempts--;
            this.showAttempts();
            this.drawHangman();
            if (this.attempts === 0) {
                this.gameOver();
            }
        }
    }
    showAttempts() {
        this.availableAttempts.textContent = 'Prób: ' + this.attempts;
    }
    removeLettersDisabled() {
        const children = this.lettersBox.querySelectorAll('.letter');
        for (let i = 0; i < this.lettersBox.children.length; i++) {
            children[i].disabled = false;
            children[i].classList.remove('cliked');
        }
    }
    addLettersDisabled() {
        const children = this.lettersBox.querySelectorAll('.letter');
        for (let i = 0; i < this.lettersBox.children.length; i++) {
            children[i].disabled = true;
            children[i].classList.add('cliked');
        }
    }

    randomSentence() {
        this.clearRandomSentence();
        this.randomDigit = Math.floor(Math.random() * this.questions.length);
        this.categoryBox.innerHTML = "Kategoria: " + this.category[this.randomDigit];
        this.randomQuestion = this.questions[this.randomDigit];
        this.randomQuestion = this.randomQuestion.replace(/ /g, '');
        console.log(this.randomQuestion);
        this.drawBar(this.randomQuestion.length);
    }

    clearRandomSentence() {
        this.confrimLetter = 0;
        this.searchingText.textContent = '';
    }
    isAllLettersConfirm() {
        if (this.confrimLetter === this.randomQuestion.length) {
            return true;
        } else {
            return false;
        }
    }
    gameOver() {

        this.addLettersDisabled();
        alert('You Lose!')
    }

    winGame() {
        if (this.attempts > 0 && this.isAllLettersConfirm()) {
            this.addLettersDisabled();
            alert('You Win!')
        }
    }

    startGame() {
        this.clearCanvas();
        this.attempts = 5;
        this.removeLettersDisabled();
        this.showAttempts();
        this.randomSentence();


    }
}


const game = new Game();
