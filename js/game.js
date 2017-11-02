const root = document.querySelector('.root');

class Game {
    constructor(number, picture) {
        this.number = number;
        this.picture = picture;
        this.url = null;
        this.arr = null;
        this.value = null;
        this.current = null;
        this.count = 0;
        this.point = number;
        this.size = null;
    }

    choice() {
        switch (this.picture) {
            case 1:
                this.url = 'one-skirt';
                break;
            case 2:
                this.url = 'two-skirt';
                break;
            case 3:
                this.url = 'three-skirt';
                break;
        }

        switch (this.number) {
            case 10:
                this.arr = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5];
                this.size = 'big';
                break;
            case 18:
                this.arr = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9];
                this.size = 'medium';
                break;
            case 24:
                this.arr = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12];
                this.size = 'small';
                break;
        }
    }

    build() {
        root.classList.add('wrapper');
        root.innerHTML = `<div class="timer"><span id="minutes"></span>:<span id="seconds"></span>
        </div>`;
        while (this.number > 0) {
            this.value = Math.round(Math.random() * (this.arr.length - 1));
            root.innerHTML += `<div class="container ${this.size}">
            <div class="card" num=${this.arr[this.value]}>
              <div class="front ${this.url}"></div>
              <div class="back">${this.arr[this.value]}</div>
            </div>
          </div>`;
            this.arr.splice(this.value, 1);
            this.number = this.number - 1;
        }
    }

    handle() {
        root.addEventListener('click', (event) => {
            let target = event.target;
            while (target !== root) {
                if (target.classList.contains('card')) {
                    if (this.count === 2) {
                        return false;
                    };

                    target.classList.add('flipped');
                    this.count = this.count + 1;

                    if (this.count === 1) {
                        this.current = target;
                    };

                    if (target === this.current) {
                        this.count = 1;
                    };

                    if (this.count === 2) {
                        if (this.current.getAttribute('num') === target.getAttribute('num')) {
                            setTimeout(() => {
                                this.current.classList.add('hide');
                                target.classList.add('hide');
                                this.point = this.point - 2;
                                this.count = 0;
                                if (this.point === 0) {
                                    this.win();
                                }
                            }, 1000);
                        } else {
                            setTimeout(() => {
                                this.current.classList.remove('flipped');
                                target.classList.remove('flipped');
                                this.count = 0;
                            }, 1000);
                        }
                    }
                    return;
                }
                target = target.parentNode;
            }
        });


    }

    timer() {
        const minutes = document.querySelector('#minutes');
        const seconds = document.querySelector('#seconds');
        let min = 0;
        let sec = 0;
        setInterval(() => {
            sec = sec + 1;
            if (sec === 60) {
                min = min + 1;
                sec = 0;
            };
            seconds.innerHTML = this.formatNumber(sec);
            minutes.innerHTML = this.formatNumber(min);
        }, 1000)
    }

    formatNumber(num) {
        if (num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    win() {
        root.classList.remove('wrapper');
        root.innerHTML = `<h2 class="win_title">You win!</h2>
                          <button class="win btn">Restart game</button>`;

        const win = document.querySelector('.win');
        win.addEventListener('click', () => {
            root.innerHTML = '';
            begin = new Start();
            begin.build();
            begin.handle();
        });
    }

    init() {
        this.choice();
        this.build();
        this.handle();
        this.timer();
    }
};

