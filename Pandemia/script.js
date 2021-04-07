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
        this.createCity(21.5, 29, 'toronto');
        this.createCity(15.2, 34, 'new york');
    }

    createCity(coordX, coordY, cityName) {
        let city = document.createElement('div');
        city.classList.add('city');
        // city.setAttribute('id', 'id0');
        // let cityFunctions = document.createElement('div');
        let cityNameBlock = document.createElement('div');
        cityNameBlock.classList.add('city_name');
        cityNameBlock.innerHTML = cityName;
        let cityWrap = document.createElement('div');
        cityWrap.classList.add('city_wrap');
        cityWrap.setAttribute("style", "top: " + coordX + "vh; left: " + coordY + "%;");

        cityWrap.append(city);
        cityWrap.append(cityNameBlock);
        this._worldMap.append(cityWrap);
    }
}

const pandemic = new Game();
