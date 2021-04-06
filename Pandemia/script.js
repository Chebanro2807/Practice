class Game {
    constructor(){
        this._mainMenu = document.querySelector('.menu_container');
        this._game = document.querySelector('.game_container');
        this._buttonStart = document.querySelector('.start');
        this._buttonStart.addEventListener('click', this.showGame.bind(this));
    }
    
    show(){
        this._game.classList.add('show');
    }

    hide(){
        this._mainMenu.classList.add('hide');
    }

    showGame(){
        this.hide();
        this.show();
    }
}

const pandemic = new Game();
