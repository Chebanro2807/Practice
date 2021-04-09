class City {
    static elWidth = 1;
    static elHeight = 2;

    constructor(name, mainColor, coordX, coordY, population) {
        this._name = name;
        this._mainColor = mainColor;
        this._coordX = coordX;
        this._coordY = coordY;
        this._isResearchStation = false;
        this._diseases = new Map([
            [this._mainColor, 0]
        ]);
        this._neighbours = [];
        this._populationIndex = population;
    }

    infectionCard() {
        if (this.addDiseaseAndCheckOutbrake(this._mainColor, 1)) {
            console.log("Outbrake!");
            // outbrake
        }
    }

    infectionCardBySpecialRule(color, amount) {
        if (this.addDiseaseAndCheckOutbrake(color, amount)) {
            // outbrake
        }
    }

    addDiseaseAndCheckOutbrake(color, amount) {
        let summa = 0;
        this._diseases.forEach(current => summa += current);
        if (summa + amount >= 4) {
            this._diseases.set(color, this._diseases.get(color) + (3 - summa));
            return true;
        }
        this._diseases.set(color, this._diseases.get(color) + amount);
        return false;
    }

    addNeigbours(neighbour) {
        if (!Array.isArray(neighbour)) { return; }
        neighbour.forEach(n =>
            this._neighbours.push(n)
        );
    }

    comparePopulationWith(city) {
        return (this._populationIndex > city._populationIndex) ? this : city;
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

    drawRoadTo(city) {
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
    static worldEndPairs = new Map([
        ["Лос-Анджелес", "Сідней"],
        ["Маніла", "Сан-Франциско"],
        ["Сан-Франциско", "Токіо"]
    ]);
    constructor() {
        this._mainMenu = document.querySelector('.menu_container');
        this._game = document.querySelector('.game_container');
        this._buttonStart = document.querySelector('.start');

        this._worldMap = document.querySelector('.intro');
        this._buttonIndicator = document.querySelector('.indicator');
        // more indicators and game buttons

        this._buttonStart.addEventListener('click', this.showGameBoard.bind(this));

        // this._buttonIndicator = document.querySelector('.indicator');
        // this._deck = document.querySelector('.deck__content');
        this._header = document.querySelector('.header');

        this._researchStation = document.querySelector('.builds');
    }

    // make decorator
    // wrapMethod(method) {
    //     method();
    //     sessionStorage.set("pandemic", this);
    // }

    // !deteteResearchStation(city) {
    //     if (!City._isResearchStation){
    //         this._researchStation.removeChild(this._createStation);
    //     }
    // !}

    createResearchStation() {
        let createStation = document.createElement('img');
        createStation.setAttribute("src", "../Pandemia/img/station.svg");
        createStation.classList.add('builds__img');
        return createStation;
    }

    prepareResearchStations() {
        for (let i=0; i<6; i++) {
            this._researchStation.appendChild(this.createResearchStation());
        }
        this.appendResearchStationToCity(this._cities.get("Атланта"));
    }

    appendResearchStationToCity(city) {
        if (this._researchStation.firstChild) {
            this._researchStation.removeChild(this._researchStation.querySelector("img"));
            city._isResearchStation = true;
            city._element.append(this.createResearchStation());
        }
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
        // this._buttonIndicator.classList.add('show_btn');
        // this._buttonIndicator.classList.add('show_flex');
        // this._deck.classList.add('show_flex');
        this._header.classList.add('show_flex');
    }

    createAllCities() {
        let aX = 25,
            aY = 32,
            dX = 1.7,
            dY = 2.5;
        this._cities = new Map([
            ["Атланта", new City("Атланта", "blue", aX, aY, 8)],
            ["Вашингтон", new City("Вашингтон", "blue", aX + 3 * dX, aY + 1 * dY, 7)],
            ["Нью-Йорк", new City("Нью-Йорк", "blue", aX + 5 * dX, aY - 2 * dY, 42)],
            ["Торонто", new City("Торонто", "blue", aX - 1 * dX, aY - 4 * dY, 2)],
            ["Чікаго", new City("Чікаго", "blue", aX - 3 * dX, aY - 3 * dY, 27)],
            ["Сан-Франциско", new City("Сан-Франциско", "blue", aX - 7 * dX, aY - 1 * dY, 15)],
            ["Мадрид", new City("Мадрид", "blue", aX + 13 * dX, aY - 3 * dY, 13)],
            ["Лондон", new City("Лондон", "blue", aX + 14 * dX, aY - 5 * dY, 23)],
            ["Париж", new City("Париж", "blue", aX + 17 * dX, aY - 4 * dY, 29)],
            ["Берлін", new City("Берлін", "blue", aX + 18 * dX, aY - 6 * dY, 4)],
            ["Мілан", new City("Мілан", "blue", aX + 20 * dX, aY - 5 * dY, 12)],
            ["Санкт-Петербург", new City("Санкт-Петербург", "blue", aX + 22 * dX, aY - 7 * dY, 9)],
            ["Київ", new City("Київ", "black", aX + 25 * dX, aY - 5 * dY, 1)],
            ["Тегеран", new City("Тегеран", "black", aX + 26 * dX, aY - 3 * dY, 20)],
            ["Багдад", new City("Багдад", "black", aX + 24 * dX, aY + 1 * dY, 17)],
            ["Стамбул", new City("Стамбул", "black", aX + 21 * dX, aY - 1 * dY, 33)],
            ["Алжир", new City("Алжир", "black", aX + 18 * dX, aY + 0 * dY, 3)],
            ["Каїр", new City("Каїр", "black", aX + 22 * dX, aY + 2 * dY, 36)],
            ["Ер-Ріяд", new City("Ер-Ріяд", "black", aX + 25 * dX, aY + 3 * dY, 11)],
            ["Карачі", new City("Карачі", "black", aX + 27 * dX, aY + 5 * dY, 43)],
            ["Делі", new City("Делі", "black", aX + 28 * dX, aY - 1 * dY, 45)],
            ["Мумбаї", new City("Мумбаї", "black", aX + 29 * dX, aY + 6 * dY, 38)],
            ["Калькутта", new City("Калькутта", "black", aX + 31 * dX, aY + 0 * dY, 35)],
            ["Ченнаї", new City("Ченнаї", "black", aX + 32 * dX, aY + 7 * dY, 25)],
            ["Бангкок", new City("Бангкок", "red", aX + 33 * dX, aY + 4 * dY, 19)],
            ["Гонконг", new City("Гонконг", "red", aX + 34 * dX, aY + 3 * dY, 18)],
            ["Джакарта", new City("Джакарта", "red", aX + 35 * dX, aY + 8 * dY, 47)],
            ["Хошимін", new City("Хошимін", "red", aX + 36 * dX, aY + 6 * dY, 21)],
            ["Маніла", new City("Маніла", "red", aX + 38 * dX, aY + 5 * dY, 44)],
            ["Сідней", new City("Сідней", "red", aX + 40 * dX, aY + 13 * dY, 5)],
            ["Тайбей", new City("Тайбей", "red", aX + 38 * dX, aY + 3 * dY, 22)],
            ["Шанхай", new City("Шанхай", "red", aX + 36 * dX, aY + 0 * dY,32)],
            ["Пекін", new City("Пекін", "red", aX + 34 * dX, aY - 3 * dY, 39)],
            ["Сеул", new City("Сеул", "red", aX + 38 * dX, aY - 3 * dY, 46)],
            ["Токіо", new City("Токіо", "red", aX + 41 * dX, aY - 2 * dY, 31)],
            ["Осака", new City("Осака", "red", aX + 40 * dX, aY + 1 * dY, 0)],
            ["Хартум", new City("Хартум", "yellow", aX + 23 * dX, aY + 7 * dY, 10)],
            ["Йоганнесбург", new City("Йоганнесбург", "yellow", aX + 22 * dX, aY + 13 * dY, 6)],
            ["Кіншаса", new City("Кіншаса", "yellow", aX + 20 * dX, aY + 8 * dY, 26)],
            ["Лагос", new City("Лагос", "yellow", aX + 18 * dX, aY + 6 * dY, 30)],
            ["Сан-Паулу", new City("Сан-Паулу", "yellow", aX + 11 * dX, aY + 11 * dY, 41)],
            ["Буенос-Айрес", new City("Буенос-Айрес", "yellow", aX + 4 * dX, aY + 13 * dY, 34)],
            ["Сантьяго", new City("Сантьяго", "yellow", aX + 3 * dX, aY + 15 * dY, 16)],
            ["Ліма", new City("Ліма", "yellow", aX + 2 * dX, aY + 10 * dY, 28)],
            ["Богота", new City("Богота", "yellow", aX + 0 * dX, aY + 6 * dY, 24)],
            ["Мехіко", new City("Мехіко", "yellow", aX - 3 * dX, aY + 3 * dY, 40)],
            ["Лос-Анджелес", new City("Лос-Анджелес", "yellow", aX - 7 * dX, aY + 3 * dY, 37)],
            ["Майамі", new City("Майамі", "yellow", aX + 2 * dX, aY + 3 * dY, 14)]
        ]);

        this._cities.get("Атланта").addNeigbours(["Майамі", "Вашингтон", "Чікаго"]);
        this._cities.get("Вашингтон").addNeigbours(["Атланта", "Майамі", "Нью-Йорк", "Торонто"]);
        this._cities.get("Нью-Йорк").addNeigbours(["Вашингтон", "Мадрид", "Лондон", "Торонто"]);
        this._cities.get("Торонто").addNeigbours(["Вашингтон", "Нью-Йорк", "Чікаго"]);
        this._cities.get("Чікаго").addNeigbours(["Атланта", "Сан-Франциско", "Торонто", "Лос-Анджелес", "Мехіко"]);
        this._cities.get("Сан-Франциско").addNeigbours(["Чікаго", "Лос-Анджелес", "Токіо", "Маніла"]);
        this._cities.get("Мадрид").addNeigbours(["Лондон", "Нью-Йорк", "Париж", "Алжир", "Сан-Паулу"]);
        this._cities.get("Лондон").addNeigbours(["Мадрид", "Нью-Йорк", "Париж", "Берлін"]);
        this._cities.get("Париж").addNeigbours(["Мадрид", "Лондон", "Берлін", "Мілан", "Алжир"]);
        this._cities.get("Берлін").addNeigbours(["Лондон", "Париж", "Мілан", "Санкт-Петербург"]);
        this._cities.get("Мілан").addNeigbours(["Берлін", "Париж", "Стамбул", "Санкт-Петербург"]);
        this._cities.get("Санкт-Петербург").addNeigbours(["Берлін", "Мілан", "Київ"]);
        this._cities.get("Київ").addNeigbours(["Стамбул", "Санкт-Петербург", "Тегеран"]);
        this._cities.get("Тегеран").addNeigbours(["Київ", "Багдад", "Ер-Ріяд", "Карачі", "Делі"]);
        this._cities.get("Багдад").addNeigbours(["Стамбул", "Тегеран", "Каїр", "Ер-Ріяд"]);
        this._cities.get("Стамбул").addNeigbours(["Мілан", "Алжир", "Київ", "Каїр", "Багдад"]);
        this._cities.get("Алжир").addNeigbours(["Мадрид", "Париж", "Стамбул", "Каїр"]);
        this._cities.get("Каїр").addNeigbours(["Стамбул", "Алжир", "Хартум", "Ер-Ріяд"]);
        this._cities.get("Ер-Ріяд").addNeigbours(["Каїр", "Багдад", "Тегеран", "Карачі"]);
        this._cities.get("Карачі").addNeigbours(["Ер-Ріяд", "Тегеран", "Делі", "Мумбаї"]);
        this._cities.get("Делі").addNeigbours(["Карачі", "Тегеран", "Калькутта", "Мумбаї"]);
        this._cities.get("Мумбаї").addNeigbours(["Делі", "Карачі", "Ченнаї"]);
        this._cities.get("Калькутта").addNeigbours(["Ченнаї", "Делі", "Бангкок"]);
        this._cities.get("Ченнаї").addNeigbours(["Мумбаї", "Делі", "Калькутта"]);
        this._cities.get("Бангкок").addNeigbours(["Ченнаї", "Калькутта", "Гонконг", "Джакарта", "Хошимін"]);
        this._cities.get("Гонконг").addNeigbours(["Бангкок", "Хошимін", "Маніла", "Тайбей", "Шанхай"]);
        this._cities.get("Джакарта").addNeigbours(["Ченнаї", "Бангкок", "Хошимін", "Сідней"]);
        this._cities.get("Хошимін").addNeigbours(["Бангкок", "Гонконг", "Джакарта", "Маніла"]);
        this._cities.get("Маніла").addNeigbours(["Гонконг", "Хошимін", "Тайбей", "Сідней", "Сан-Франциско"]);
        this._cities.get("Сідней").addNeigbours(["Маніла", "Джакарта", "Лос-Анджелес"]);
        this._cities.get("Тайбей").addNeigbours(["Гонконг", "Шанхай", "Маніла", "Осака"]);
        this._cities.get("Шанхай").addNeigbours(["Гонконг", "Тайбей", "Пекін", "Сеул", "Токіо"]);
        this._cities.get("Пекін").addNeigbours(["Шанхай", "Сеул"]);
        this._cities.get("Сеул").addNeigbours(["Шанхай", "Токіо", "Пекін"]);
        this._cities.get("Токіо").addNeigbours(["Шанхай", "Сеул", "Осака", "Сан-Франциско"]);
        this._cities.get("Осака").addNeigbours(["Токіо", "Тайбей"]);
        this._cities.get("Хартум").addNeigbours(["Каїр", "Йоганнесбург", "Кіншаса", "Лагос"]);
        this._cities.get("Йоганнесбург").addNeigbours(["Кіншаса", "Хартум"]);
        this._cities.get("Кіншаса").addNeigbours(["Хартум", "Йоганнесбург", "Лагос"]);
        this._cities.get("Лагос").addNeigbours(["Хартум", "Кіншаса", "Сан-Паулу"]);
        this._cities.get("Сан-Паулу").addNeigbours(["Лагос", "Мадрид", "Богота", "Буенос-Айрес"]);
        this._cities.get("Буенос-Айрес").addNeigbours(["Сан-Паулу", "Богота"]);
        this._cities.get("Сантьяго").addNeigbours(["Ліма"]);
        this._cities.get("Ліма").addNeigbours(["Сантьяго", "Богота", "Мехіко"]);
        this._cities.get("Богота").addNeigbours(["Сан-Паулу", "Буенос-Айрес", "Майамі", "Мехіко", "Ліма"]);
        this._cities.get("Мехіко").addNeigbours(["Майамі", "Богота", "Ліма", "Лос-Анджелес", "Чікаго"]);
        this._cities.get("Лос-Анджелес").addNeigbours(["Мехіко", "Сан-Франциско", "Сідней", "Чікаго"]);
        this._cities.get("Майамі").addNeigbours(["Богота", "Мехіко", "Вашингтон", "Атланта"]);
    }

    checkEndPairs(city, neighbour) {
        if (Game.worldEndPairs.has(city._name) && Game.worldEndPairs.get(city._name) === neighbour._name ||
            Game.worldEndPairs.has(neighbour._name) && Game.worldEndPairs.get(neighbour._name) === city._name) {
            this.drawEndPairsRoad(city, neighbour);
            this.drawEndPairsRoad(neighbour, city);
            return true;
        }
        return false;
    }

    drawEndPairsRoad(current, neighbour) {
        let fakeCity = new City(neighbour._name, neighbour._mainColor, (current._coordX > neighbour._coordX) ? 99 : 0, neighbour._coordY);
        this._worldMap.appendChild(fakeCity.drawCity());
        this._worldMap.appendChild(current.drawRoadTo(fakeCity));
    }

    drawStartMap() {
        this._cities.forEach((city, key, map) => this._worldMap.appendChild(city.drawCity()));
        let drownCityLines = new Set();
        this._cities.forEach((city, key, map) => {
            city._neighbours.forEach(neigbourName => {
                if (!drownCityLines.has(neigbourName)) {
                    if (!this.checkEndPairs(city, this._cities.get(neigbourName))) {
                        this._worldMap.appendChild(city.drawRoadTo(this._cities.get(neigbourName)));
                    }
                }
            })
            drownCityLines.add(city);
        });
    }

    createDiseasesDeck() {
        this._diseasesDeck = [];
        this._cities.forEach(city => this._diseasesDeck.push(city._name));
        this._diseasesDeckDiscard = [];
    }

    prepareStartBoard() {
        this.cleanGameBoard();
        this.createAllCities();
        this.drawStartMap();
        this.prepareResearchStations();
        // this.createPlayerDeck
        this.createDiseasesDeck();
        /*this._cities.get(this._diseasesDeck[17]).infectionCard();
        console.log(this._cities.get(this._diseasesDeck[17])._diseases.get("black"));
        this._cities.get(this._diseasesDeck[17]).infectionCard();
        console.log(this._cities.get(this._diseasesDeck[17])._diseases.get("black"));
        this._cities.get(this._diseasesDeck[17]).infectionCard();
        console.log(this._cities.get(this._diseasesDeck[17])._diseases.get("black"));
        this._cities.get(this._diseasesDeck[17]).infectionCard();
        console.log(this._cities.get(this._diseasesDeck[17])._diseases.get("black"));*/
        this.drawStartMap();
    }

    showGameBoard() {
        this.hideStartMenu();
        this.showBoardElements();
        this.prepareStartBoard();
    }
}


const pandemic = new Game();