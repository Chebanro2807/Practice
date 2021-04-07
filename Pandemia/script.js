class City {
    static elWidth = 1;
    static elHeight = 1;

    constructor(name, mainColor, coordX, coordY) {
        this._name = name;
        this._mainColor = mainColor;
        this._coordX = coordX;
        this._coordY = coordY;
        this._isResearchStation = false;
        this._diseases = new Map([
            [this._mainColor, 0]
        ]);
    }

    drawCity() {
        let cityPoint = document.createElement('div');
        cityPoint.classList.add('city');
        let cityName = document.createElement('div');
        cityName.classList.add('city_name');
        cityName.innerHTML = this._name;
        this._element = document.createElement('div');
        this._element.classList.add('city_wrap');
        this._element.setAttribute("style", "left:" + this._coordX + "%; top:" + this._coordY + "%; width:" + City.elWidth + "%; height:" + City.elHeight + "%;");
        this._element.appendChild(cityPoint);
        this._element.appendChild(cityName);
        return this._element;
    }

    createRoadTo(city) {
        let roadSvg = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
        roadSvg.classList.add('svg');
        let leftCorner = (this._coordX < city._coordX) ? this._coordX : city._coordX;
        let rightCorner = (this._coordY < city._coordY) ? this._coordY : city._coordY;

        roadSvg.setAttribute("width", (Math.abs(this._coordX - city._coordX) + City.elWidth) + "%");
        roadSvg.setAttribute("height", (Math.abs(this._coordY - city._coordY) + City.elHeight) + "%");
        roadSvg.setAttribute("style", "left:" + leftCorner + "%;top:" + rightCorner + "%;");

        let roadLine = document.createElementNS("http://www.w3.org/2000/svg", 'line');

        roadLine.setAttribute("x1", (this._coordX < city._coordX) ? "0%" : "100%");
        roadLine.setAttribute("y1", (this._coordY < city._coordY) ? "0%" : "100%");
        roadLine.setAttribute("x2", (this._coordX > city._coordX) ? "0%" : "100%");
        roadLine.setAttribute("y2", (this._coordY > city._coordY) ? "0%" : "100%");
        roadLine.setAttribute("style", "stroke:white;stroke-width:2;");

        roadSvg.appendChild(roadLine);
        return roadSvg;
    }
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

        let bg = document.createElement("img");
        bg.className = "bg-map";
        bg.setAttribute("src", "img/world-map.jpg");
        this._worldMap.appendChild(bg);
    }

    showBoardElements() {
        this._game.classList.add('show');
        this._worldMap.classList.add('show');
        this._buttonIndicator.classList.add('show_btn');
    }

    createAllCities() {
        this._tmpCity = new City("Атланта", "blue", 30, 22);
        this._tmpCity1 = new City("Вашингтон", "blue", 41, 20);
    }

    drawStartMap() {
        this._worldMap.appendChild(this._tmpCity.drawCity());
        this._worldMap.appendChild(this._tmpCity1.drawCity());
        this._worldMap.appendChild(this._tmpCity.createRoadTo(this._tmpCity1));
    }

    prepareStartBoard() {
        this.cleanGameBoard();
        this.createAllCities();
        this.drawStartMap();
    }

    showGameBoard() {
        this.hideStartMenu();
        this.showBoardElements();
        this.prepareStartBoard();
    }
}


const pandemic = new Game();