class Game {
    constructor() {
        this._mainMenu = document.querySelector('.menu_container');
        this._game = document.querySelector('.game_container');
        this._buttonStart = document.querySelector('.start');
        this._buttonStart.addEventListener('click', this.showGame.bind(this));

        this._wrapCityWidht = 1;
        this._wrapCityHeight = 2;

        this._worldMap = document.querySelector('.intro');

        // this._buttonIndicator = document.querySelector('.indicator');
        // this._deck = document.querySelector('.deck__content');
        this._header = document.querySelector('.header');
    }
    
    show() {
        this._game.classList.add('show');
        this._worldMap.classList.add('show');
        // this._buttonIndicator.classList.add('show_flex');
        // this._deck.classList.add('show_flex');
        this._header.classList.add('show_flex');
    }

    hide() {
        this._mainMenu.classList.add('hide');
    }

    showGame() {
        this.hide();
        this.show();
        this.createCity(29, 22, 'toronto');
        this.createCity(74, 10, 'new york');
        this.createCity(10, 78, 'Kyiv');
        this.createRoad(29, 22, 74, 10);
        this.createRoad(29, 22, 10, 78);
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
        cityWrap.setAttribute("style", "left:" + coordX + "%; top:" + coordY + "%; width:" + this._wrapCityWidht + "%; height:" + this._wrapCityHeight + "%;");

        cityWrap.append(city);
        cityWrap.append(cityNameBlock);
        this._worldMap.append(cityWrap);
    }

    createRoad(coordX0, coordY0, coordX1, coordY1) {
        let roadSvg = document.createElementNS("http://www.w3.org/2000/svg",'svg');
        roadSvg.classList.add('svg');
        let leftCorner = (coordX0 < coordX1) ? coordX0 : coordX1;
        let rightCorner = (coordY0 < coordY1) ? coordY0 : coordY1;

        roadSvg.setAttribute("height", (Math.abs(coordY0 - coordY1) + this._wrapCityHeight) + "%");
        roadSvg.setAttribute("width", (Math.abs(coordX0 - coordX1) + this._wrapCityWidht) + "%");
        roadSvg.setAttribute("style", "left:" + leftCorner + "%;top:" + rightCorner + "%;");
        // roadSvg.setAttributeNS("http://www.w3.org/2000/svg", "viewBox", "0 0 500 500");

        let roadLine = document.createElementNS("http://www.w3.org/2000/svg",'line');

        roadLine.setAttribute("x1", (coordX0 < coordX1) ? "0%":"100%"); 
        roadLine.setAttribute("y1", (coordY0 < coordY1) ? "0%":"100%");
        roadLine.setAttribute("x2", (coordX0 > coordX1) ? "0%":"100%");
        roadLine.setAttribute("y2", (coordY0 > coordY1) ? "0%":"100%");
        roadLine.setAttribute("style", "stroke:white;stroke-width:2");

        roadSvg.appendChild(roadLine);
        this._worldMap.appendChild(roadSvg);
    }
}

const pandemic = new Game();
