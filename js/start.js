class Start {
    constructor() {
        this.rules = `<h3 class="info">How to play:</h3>
       <p>Memory is counter game where the object is to find pairs.</p>
       <p>When the game begins, all pictures are hidden.</p>
       <h3 class="rules">To play:</h3>
       <ol class="rules__item">
         <li>Select two cards to try to match the pictures.</li>
         <li>If ypu match the pictures you can go again.</li>
         <li>If they don't match it is the computer turn them.</li>
         <li>The player that finds all pairs wins!</li>
         <li>Have fun!</li>
       </ol>`;
        this.diff = `<h3 class="game_diff">Game Difficulty</h3>
        <form class="diff_form">
       <label about="20">
         <input type="radio" name="diff" value="10" checked>
         Low (5x2)
       </label>
       <label abc="20">
         <input type="radio" name="diff" value="18">
         Medium (6x3)
       </label>
       <label abc="20">
         <input type="radio" name="diff" value="24">
         High (8x3)
       </label>
     </form>`;
        this.skirt = `<h3 class="skirt_cards">Skirt Cards</h3>
        <form class="skirt_form">
     <label>
         <input type="radio" name="skirt" value="1" checked>
         <img src="img/card_1.jpg" width="35" height="60" alt="First skirt">
       </label>
       <label>
         <input type="radio" name="skirt" value="2">
         <img src="img/card_2.jpg" width="35" height="60" alt="Second skirt">
       </label>
       <label>
         <input type="radio" name="skirt" value="3">
         <img src="img/card_3.jpg" width="35" height="60" alt="Third skirt">
       </label>
        </form>`;
        this.button = `<button class="start btn">Start Game</button>`;
        this.number = 10;
        this.picture = 1;
    }

    build() {
        root.innerHTML = this.rules;
        root.innerHTML += this.diff;
        root.innerHTML += this.skirt;
        root.innerHTML += this.button;
    }

    handle() {
        const formDiff = document.querySelector('.diff_form');
        const formSkirt = document.querySelector('.skirt_form');
        const startGame = document.querySelector('.start');
        formDiff.addEventListener('click', (event) => {
            this.number = Number(event.target.value);
        });
        formSkirt.addEventListener('click', (event) => {
            this.picture = Number(event.target.value);
        });
        startGame.addEventListener('click', (event) => {
            event.stopPropagation();
            root.innerHTML = '';
            const initGame = new Game(this.number, this.picture);
            initGame.init();
        });
    }
};

let begin = new Start();
begin.build();
begin.handle();

