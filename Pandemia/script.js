class Game {
    constructor() {
        this._mainMenu = document.querySelector('.menu_container');
        this._game = document.querySelector('.game_container');
        this._buttonStart = document.querySelector('.start');
        this._buttonStart.addEventListener('click', this.showGame.bind(this));

        this._worldMap=document.querySelector('.intro');
    }
    
    show() {
        this._game.classList.add('show');
        this._worldMap.classList.add('show');
    }

    hide() {
        this._mainMenu.classList.add('hide');
    }

    showGame() {
        this.hide();
        this.show();
        this.createCity()
    }

    createCity() {
        let city = document.createElement('div');
        city.classList.add('city');
        city.setAttribute('id', 'id0');
        let cityFunctions = document.createElement('div');


        this._worldMap.append(city);
    }
}

const pandemic = new Game();
