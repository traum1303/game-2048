jQuery(document).ready(function($) {
    class Game {
        constructor() {
            let self = this;
            this.container = $('#container');
            this.score = $('#score');
            this.best = $('#best');
            this.items = [];
            document.cookie = 'score=0;';
            this.newGame();
            $(document).keydown(function(e) {
                if (true === self.gameOver) {
                    console.log('game over');
                    return;
                }
                self.keyDown(e.keyCode);
            });
            $(document).on('click', '.new_game', function() {
                self.newGame();
            });
            $(document).on('click', '.continue', function() {
                self.continue = true;
                self.start();
            });
        };

        isEmpty(item) {
            return 'undefined' === typeof this.getItem(item) || 0 === this.getItem(item);
        }

        moveTop() {
            for (let i = 0; i < 16; i++) {
                if (this.isEmpty(i)) {
                    continue;
                }
                for (let k = 1; k < 5; k++) {
                    if ((i - 4 * k) < -1) {
                        continue;
                    }
                    switch (k) {
                        case 1:
                            if (!this.isEmpty(i - 4 * k) && this.items[i - 4 * k] === this.items[i]) {
                                this.items[i - 4 * k] = 2 * this.items[i];
                                this.items[i] = 0;
                            }
                            break;
                        case 2:
                            if (!this.isEmpty(i - 4 * k) && this.isEmpty(i - 4) && this.items[i - 4 * k] === this.items[i]) {
                                this.items[i - 4 * k] = 2 * this.items[i];
                                this.items[i] = 0;
                            }
                            break;
                        case 3:
                            if (!this.isEmpty(i - 4 * k) && this.isEmpty(i - 4) && this.isEmpty(i - 8) && this.items[i - 4 * k] === this.items[i]) {
                                this.items[i - 4 * k] = 2 * this.items[i];
                                this.items[i] = 0;
                            }
                            break;
                        case 4:
                            if (!this.isEmpty(i - 4 * k) && this.isEmpty(i - 4) && this.isEmpty(i - 8) && this.isEmpty(i - 12) && this.items[i - 4 * k] === this.items[i]) {
                                this.items[i - 4 * k] = 2 * this.items[i];
                                this.items[i] = 0;
                            }
                            break;

                    }

                }
            }

            for (let j = 0; j < 16; j++) {
                for (let a = 1; a < 5; a++) {
                    if (false !== this.isEmpty(j) && (j + 4 * a) < 16 && !this.isEmpty(j + 4 * a)) {
                        this.items[j] = this.items[j + 4 * a];
                        this.items[j + 4 * a] = 0;
                    }
                }
            }
        }

        moveBottom() {
            for (let i = 15; i >= 0; i--) {
                if (this.isEmpty(i)) {
                    continue;
                }
                for (let k = 4; k > 0; k--) {
                    if ((i + 4 * k) > 15) {
                        continue;
                    }
                    switch (k) {
                        case 1:
                            if (!this.isEmpty(i + 4 * k) && this.items[i + 4 * k] === this.items[i]) {
                                this.items[i + 4 * k] = 2 * this.items[i];
                                this.items[i] = 0;
                            }
                            break;
                        case 2:
                            if (!this.isEmpty(i + 4 * k) && this.isEmpty(i + 4) && this.items[i + 4 * k] === this.items[i]) {
                                this.items[i + 4 * k] = 2 * this.items[i];
                                this.items[i] = 0;
                            }
                            break;
                        case 3:
                            if (!this.isEmpty(i + 4 * k) && this.isEmpty(i + 4) && this.isEmpty(i + 8) && this.items[i + 4 * k] === this.items[i]) {
                                this.items[i + 4 * k] = 2 * this.items[i];
                                this.items[i] = 0;
                            }
                            break;
                        case 4:
                            if (!this.isEmpty(i + 4 * k) && this.isEmpty(i + 4) && this.isEmpty(i + 8) && this.isEmpty(i + 12) && this.items[i + 4 * k] === this.items[i]) {
                                this.items[i + 4 * k] = 2 * this.items[i];
                                this.items[i] = 0;
                            }
                            break;

                    }

                }
            }

            for (let j = 15; j >= 0; j--) {
                for (let a = 1; a < 5; a++) {
                    if (false !== this.isEmpty(j) && (j - 4 * a) >= 0 && !this.isEmpty(j - 4 * a)) {
                        this.items[j] = this.items[j - 4 * a];
                        this.items[j - 4 * a] = 0;
                    }
                }
            }
        }

        moveLeft() {
            let rest_i;
            for (let i = 0; i < 16; i++) {
                if (this.isEmpty(i)) {
                    continue;
                }
                rest_i = i % 4;
                let diff, rest;
                for (let k = 1; k < 5; k++) {
                    diff = i - k;
                    rest = diff % 4;
                    if (diff < -1) {
                        continue;
                    }
                    switch (k) {
                        case 1:
                            if (!this.isEmpty(i - k) &&
                                    this.items[i - k] === this.items[i] &&
                                    rest !== 3) {
                                this.items[i - k] = 2 * this.items[i];
                                this.items[i] = 0;
                            }
                            break;
                        case 2:
                            if (!this.isEmpty(i - k)
                                    && this.isEmpty(i - 1)
                                    && this.items[i - k] === this.items[i]
                                    && rest !== 3 && (i - 1) % 4 !== 3) {
                                this.items[i - k] = 2 * this.items[i];
                                this.items[i] = 0;
                            }
                            break;
                        case 3:
                            if (!this.isEmpty(i - k) &&
                                    this.isEmpty(i - 1) &&
                                    this.isEmpty(i - 2) &&
                                    this.items[i - k] === this.items[i] &&
                                    rest !== 3 &&
                                    (i - 1) % 4 !== 3 &&
                                    (i - 2) % 4 !== 3) {
                                this.items[i - k] = 2 * this.items[i];
                                this.items[i] = 0;
                            }
                            break;
                        case 4:
                            if (!this.isEmpty(i - k) &&
                                    this.isEmpty(i - 1) &&
                                    this.isEmpty(i - 2) &&
                                    this.isEmpty(i - 3) &&
                                    this.items[i - k] === this.items[i] &&
                                    rest !== 3 &&
                                    (i - 1) % 4 !== 3 &&
                                    (i - 2) % 4 !== 3 &&
                                    (i - 3) % 4 !== 3) {
                                this.items[i - k] = 2 * this.items[i];
                                this.items[i] = 0;
                            }
                            break;

                    }

                }
            }

            for (let j = 0; j < 16; j++) {
                if (j % 4 === 1) {
                    if (!this.isEmpty(j) && (j - 1) > -1 && this.isEmpty(j - 1)) {
                        this.items[j - 1] = this.items[j];
                        this.items[j] = 0;
                    }
                }
                if (j % 4 === 2) {
                    if (!this.isEmpty(j) && (j - 2) > -1) {

                        if (this.isEmpty(j - 2)) {
                            this.items[j - 2] = this.items[j];
                            this.items[j] = 0;
                        } else if (this.isEmpty(j - 1)) {
                            this.items[j - 1] = this.items[j];
                            this.items[j] = 0;
                        }

                    }
                }
                if (j % 4 === 3) {
                    if (!this.isEmpty(j) && (j - 3) > -1) {
                        if (this.isEmpty(j - 3)) {
                            this.items[j - 3] = this.items[j];
                            this.items[j] = 0;
                        } else if (this.isEmpty(j - 2)) {
                            this.items[j - 2] = this.items[j];
                            this.items[j] = 0;
                        } else if (this.isEmpty(j - 1)) {
                            this.items[j - 1] = this.items[j];
                            this.items[j] = 0;
                        }
                    }
                }
            }
        }

        moveRight() {
            let rest_i;
            for (let i = 0; i < 16; i++) {
                if (this.isEmpty(i)) {
                    continue;
                }
                rest_i = i % 4;
                let diff, rest;
                for (let k = 1; k < 5; k++) {
                    diff = i + k;
                    rest = diff % 4;
                    if (diff > 15) {
                        continue;
                    }
                    switch (k) {
                        case 1:
                            if (!this.isEmpty(i + k) &&
                                    this.items[i + k] === this.items[i] &&
                                    rest !== 0) {
                                this.items[i + k] = 2 * this.items[i];
                                this.items[i] = 0;
                            }
                            break;
                        case 2:
                            if (!this.isEmpty(i + k)
                                    && this.isEmpty(i + 1)
                                    && this.items[i + k] === this.items[i]
                                    && rest !== 0 && (i + 1) % 4 !== 0) {
                                this.items[i + k] = 2 * this.items[i];
                                this.items[i] = 0;
                            }
                            break;
                        case 3:
                            if (!this.isEmpty(i + k) &&
                                    this.isEmpty(i + 1) &&
                                    this.isEmpty(i + 2) &&
                                    this.items[i + k] === this.items[i] &&
                                    rest !== 0 &&
                                    (i + 1) % 4 !== 0 &&
                                    (i + 2) % 4 !== 0) {
                                this.items[i + k] = 2 * this.items[i];
                                this.items[i] = 0;
                            }
                            break;
                        case 4:
                            if (!this.isEmpty(i + k) &&
                                    this.isEmpty(i + 1) &&
                                    this.isEmpty(i + 2) &&
                                    this.isEmpty(i + 3) &&
                                    this.items[i + k] === this.items[i] &&
                                    rest !== 4 &&
                                    (i + 1) % 4 !== 0 &&
                                    (i + 2) % 4 !== 0 &&
                                    (i + 3) % 4 !== 0) {
                                this.items[i + k] = 2 * this.items[i];
                                this.items[i] = 0;
                            }
                            break;

                    }

                }
            }

            for (let j = 15; j >= 0; j--) {
                if (j % 4 === 2) {
                    if (!this.isEmpty(j) && (j + 1) < 16 && this.isEmpty(j + 1)) {
                        this.items[j + 1] = this.items[j];
                        this.items[j] = 0;
                    }
                }
                if (j % 4 === 1) {
                    if (!this.isEmpty(j) && (j + 2) < 16) {

                        if (this.isEmpty(j + 2)) {
                            this.items[j + 2] = this.items[j];
                            this.items[j] = 0;
                        } else if (this.isEmpty(j + 1)) {
                            this.items[j + 1] = this.items[j];
                            this.items[j] = 0;
                        }

                    }
                }
                if (j % 4 === 0) {
                    if (!this.isEmpty(j) && (j + 3) < 16) {
                        if (this.isEmpty(j + 3)) {
                            this.items[j + 3] = this.items[j];
                            this.items[j] = 0;
                        } else if (this.isEmpty(j + 2)) {
                            this.items[j + 2] = this.items[j];
                            this.items[j] = 0;
                        } else if (this.isEmpty(j + 1)) {
                            this.items[j + 1] = this.items[j];
                            this.items[j] = 0;
                        }
                    }
                }
            }
        }

        getRandomStartItem() {
            return 2 * (this.getRandomInt(2) + 1);
        };

        getRandomInt(max) {
            return Math.floor(Math.random() * max);
        };


        keyDown(keyCode) {
            switch (keyCode) {
                case 37:
                case 65:
                    this.moveLeft();
                    break;
                case 38:
                case 87:
                    this.moveTop();
                    break;
                case 39:
                case 68:
                    this.moveRight();
                    break;
                case 40:
                case 83:
                    this.moveBottom();
                    break;
            }

            this.setItems(this.getNewItem(), this.getRandomStartItem());
            if (!this.canMove()) {
                this.gameOver = true;
            }
            this.start();
        };

        start() {
            let score = 0;
            let className = '';
            let integer = '';
            this.container.html('');
            for (let i = 0; i < 16; i++) {
                if (!this.isEmpty(i)) {
                    className = ' class="item-' + Math.log2(this.getItem(i)) + '"';
                    integer = this.getItem(i);
                    score += integer;
                } else {
                    className = integer = '';
                }
                this.container.append('<div id="item-' + i + '" ' + className + '>' + integer + '</div>');
                if (integer >= 2048 && false === this.continue) {
                    this.container.append('<div id="popup"><p>Congratulation. You won the game!!!</p><div><button class="new_game">New Game</button><button class="continue">Continue</button></div></div>');
                }
            }

            if (true === this.gameOver) {
                this.container.append('<div id="popup"><p>Game over :(</p><div><button class="new_game" style="float: none; margin: 0 auto;">New Game</button></div></div>');
            }

            this.score.html(score);
            if (score > this.getBest()) {
                this.best.html(score);
                document.cookie = 'score=' + score + ';';
            }
        };

        setItems(index = null, value = null) {
            if (null !== index && null !== value) {
                this.items[index] = value;
            } else {
                for (let i = 0; i < 16; i++) {
                    this.items[i] = 0;
                }
            }
        }

        getItem(index) {
            return this.items[index];
        }

        getNewItem() {
            let numbers = [];
            for (let i = 0; i < 16; i++) {
                if (this.isEmpty(i)) {
                    numbers.push(i);
                }
            }
            if (numbers.length === 0) {
                return -1;
            }
            return numbers[Math.floor(Math.random() * numbers.length)];
        }

        newGame() {
            this.continue = false;
            this.gameOver = false;
            this.setItems();
            this.setItems(this.getNewItem(), this.getRandomStartItem());
            this.setItems(this.getNewItem(), this.getRandomStartItem());
            this.start();
        }

        getBest() {
            return document.cookie.split('; ').find(row => row.startsWith('score=')).split('=')[1];
        }

        canMove() {
            for (let i = 0; i < 16; i++) {
                if (this.isEmpty(i) || (i % 4 !== 3 && this.getItem(i) === this.getItem(i + 1)) || this.getItem(i) === this.getItem(i + 4)) {
                    return true;
                }
            }
            return false;
        }
    }

    new Game();
});