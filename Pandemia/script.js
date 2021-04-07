class City {
    constructor(name, mainColor, coordX, coordY) {
        this._name = name;
        this._mainColor = mainColor;
        this._coordX = coordX;
        this._coordX = coordY;
        this._isResearchStation = false;
        this._diseases = new Map([
            [this._mainColor, 0]
        ]);
    }

    drawCity(elWidth, elHeight) {
        let cityPoint = document.createElement('div');
        cityPoint.classList.add('city');
        let cityName = document.createElement('div');
        cityName.classList.add('city_name');
        cityName.innerHTML = this._name;
        this._element = document.createElement('div');
        this._element.classList.add('city_wrap');
        this._element.setAttribute("style", "left:" + this._coordX + "%; top:" + this.coordY + "%; width:" + elWidth + "%; height:" + elHeight + "%;");
        this._element.appendChild(cityPoint);
        this._element.appendChild(cityName);
        console.log(this._element);
        return this._element;
    }

    /*createRoad(coordX0, coordY0, coordX1, coordY1) {
        let roadSvg = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
        roadSvg.classList.add('svg');
        let leftCorner = (coordX0 < coordX1) ? coordX0 : coordX1;
        let rightCorner = (coordY0 < coordY1) ? coordY0 : coordY1;

        roadSvg.setAttribute("height", (Math.abs(coordY0 - coordY1) + this._wrapCityHeight) + "%");
        roadSvg.setAttribute("width", (Math.abs(coordX0 - coordX1) + this._wrapCityWidth) + "%");
        roadSvg.setAttribute("style", "left:" + leftCorner + "%;top:" + rightCorner + "%;");

        let roadLine = document.createElementNS("http://www.w3.org/2000/svg", 'line');

        roadLine.setAttribute("x1", (coordX0 < coordX1) ? "0%" : "100%");
        roadLine.setAttribute("y1", (coordY0 < coordY1) ? "0%" : "100%");
        roadLine.setAttribute("x2", (coordX0 > coordX1) ? "0%" : "100%");
        roadLine.setAttribute("y2", (coordY0 > coordY1) ? "0%" : "100%");
        roadLine.setAttribute("style", "stroke:white;stroke-width:2");

        roadSvg.appendChild(roadLine);
        this._worldMap.appendChild(roadSvg);
    }*/
}

class Game {
    constructor() {
        this._mainMenu = document.querySelector('.menu_container');
        this._game = document.querySelector('.game_container');
        this._buttonStart = document.querySelector('.start');
        this._worldMap = document.querySelector('.intro');
        this._buttonIndicator = document.querySelector('.indicator');

        this._buttonStart.addEventListener('click', this.showGameBoard.bind(this));
    }

    hideStartMenu() {
        this._mainMenu.classList.add('hide');
    }

    cleanGameBoard() {
        while (this._worldMap.firstChild) {
            this._worldMap.removeChild(this._worldMap.firstChild);
        }
    }

    showBoardElements() {
        this._game.classList.add('show');
        this._buttonIndicator.classList.add('show_btn');
    }

    createAllCities() {
        this._tmpCity = new City("Atlanta", "blue", 30, 22);
    }

    prepareStartBoard() {
        let wrapCityPointWidth = 1;
        let wrapCityPointHeight = 2;

        this.cleanGameBoard();
        this.createAllCities();

        this._worldMap.append(this._tmpCity.drawCity(wrapCityPointWidth, wrapCityPointHeight));
    }

    showGameBoard() {
        this.hideStartMenu();
        this.showBoardElements();
        this.prepareStartBoard();
    }
}


const pandemic = new Game();