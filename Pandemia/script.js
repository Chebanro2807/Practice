class City {
    static elWidth = 5;
    static elHeight = 10;

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

    diseaseCard() {
        if (this.addDiseaseAndCheckOutbrake(this._mainColor, 1)) {
            console.log("Outbrake!");
            // outbrake
        }
    }

    diseaseCardBySpecialRule(color, amount) {
        if (this.addDiseaseAndCheckOutbrake(color, amount)) {
            // outbrake
        }
    }

    addDiseaseAndCheckOutbrake(color, amount) {
        let summa = 0;
        this._diseases.forEach(current => summa += current);
        if (summa + amount >= 4) {
            this._diseases.set(color, this._diseases.get(color) + (3 - summa));
            this.drawDisease();
            return true;
        }
        this._diseases.set(color, this._diseases.get(color) + amount);
        this.drawDisease();
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

    drawFakeCity() {
        this._element = document.createElement('div');
        this._element.classList.add('city_wrap');
        this._element.classList.add('fake-city_wrap');
        this._element.setAttribute("style", "left:" + this._coordX + "%; top:" + this._coordY + "%; width:" + City.elWidth + "%; height:" + City.elHeight + "%;");
        let cityName = document.createElement('div');
        cityName.classList.add('city_name');
        let cityPoint = document.createElement('div');
        cityPoint.classList.add('fake-city');
        let cityWrap =  document.createElement('div');
        cityWrap.classList.add('fake-city_w');
        let blankMirror = document.createElement('div');
        cityWrap.setAttribute("style", "width: 1px;");
        blankMirror.setAttribute("style", "width: 1px;");
        let cityImg = document.createElement('img');
        cityImg.setAttribute('src', "img/city/" + this._mainColor + "-city.png");
        cityImg.classList.add("city-picture");
        cityName.innerHTML = this._name;
        cityPoint.appendChild(cityImg);
        cityWrap.appendChild(cityName);
        this._element.appendChild(cityPoint);
        (this._coordX == 0) ? this._element.appendChild(cityWrap) : this._element.prepend(cityWrap);
        (this._coordX == 0) ? this._element.prepend(blankMirror) : this._element.appendChild(blankMirror);
        return this._element;
    }

    drawCity() {
        let cityPoint = document.createElement('div');
        cityPoint.classList.add('city');
        let cityName = document.createElement('div');
        cityName.classList.add('city_name');
        let cityWrap =  document.createElement('div');
        cityWrap.classList.add('city_w');
        cityName.innerHTML = this._name;
        let diseaseWrap = document.createElement('div');
        diseaseWrap.classList.add('disease-wrap');
        this._element = document.createElement('div');
        this._element.classList.add('city_wrap');
        this._element.setAttribute("style", "left:" + this._coordX + "%; top:" + this._coordY + "%; width:" + City.elWidth + "%; height:" + City.elHeight + "%;");
        let cityImg = document.createElement('img');
        cityImg.setAttribute('src', "img/city/" + this._mainColor + "-city.png");
        cityImg.classList.add("city-picture");
        cityPoint.appendChild(cityImg);
        cityWrap.appendChild(cityName);
        this._element.appendChild(cityWrap);
        this._element.appendChild(cityPoint);
        this._element.appendChild(diseaseWrap);
        return this._element;
    }

    drawRoadTo(city) {
        let roadSvg = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
        roadSvg.classList.add('svg');
        let leftCorner = (this._coordX == city._coordX) ? this._coordX - City.elWidth/2  : (this._coordX < city._coordX) ? this._coordX + City.elWidth/2 : city._coordX + City.elWidth/2;
        let rightCorner = (this._coordY == city._coordY) ? this._coordY - City.elHeight/2 : (this._coordY < city._coordY) ? this._coordY + City.elHeight/2 : city._coordY + City.elHeight/2;

        roadSvg.setAttribute("width", (this._coordX == city._coordX) ? City.elWidth + "%" : (Math.abs(this._coordX - city._coordX)) + "%");
        roadSvg.setAttribute("height", (this._coordY == city._coordY) ? City.elHeight + "%" : (Math.abs(this._coordY - city._coordY)) + "%");
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

    drawResearchStation() {
        this._element.querySelector('.city_w').appendChild(City.createResearchStation());
    }

    drawDisease() {
        this._diseases.forEach((value, key) => {
            for (let i = 0; i < value; i++) {
                this._element.querySelector(".disease-wrap").appendChild(this.createCubeOfDisease(key));
            }
        });
    }

    removePlayer(player) {
        this._element.querySelector(".city_w").removeChild(this._element.querySelector(".city_w").querySelector("img[data-profession='" + player.profession +"']"));
    }

    drawPlayer(player) {
        let playerimg = document.createElement("img");
        playerimg.setAttribute("src", "img/players/player-" + player.profession + ".png");
        playerimg.classList.add("players-location");
        playerimg.setAttribute("data-profession", player.profession);
        this._element.querySelector(".city_w").prepend(playerimg);
    }

    createCubeOfDisease(color) {
        let createDisease = document.createElement('img');
        createDisease.setAttribute("src", "img/disease-cubs/" + color + "-cube.png");
        // createDisease.setAttribute("style", "background-color:" + color + ";");
        createDisease.setAttribute("width","15px");
        createDisease.setAttribute("height","15px");
        // console.log(createDisease);
        // createDisease.classList.add('');
        return createDisease;
    }

    static createResearchStation() {
        let createStation = document.createElement('img');
        createStation.setAttribute("src", "/Pandemia/img/station.png");
        createStation.classList.add('builds__img');
        return createStation;
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
        this._playersDeckIndicator = document.querySelector('#players-deck');
        this._playersDeckIndicatorDiscard = document.querySelector('#players-deck-discard');
        this._diseaseDeckIndicator = document.querySelector('#diseases-deck');
        this._diseaseDeckIndicatorDiscard = document.querySelector('#diseases-deck-discard');
        this._outbrakeIndicator = document.querySelector('#flash-outbrake-indicator');
        this._spreadIndicator = document.querySelector('#disease-spreading-indicator');
        this._diseasesIndicators = new Map();
        document.querySelectorAll(".disease-indicator-counter").forEach(indicator => {
            this._diseasesIndicators.set(indicator.getAttribute("data-color"), indicator);
        });


        this._header = document.querySelector('.header');
        this._researchStation = document.querySelector('.builds');
        this._popup = document.querySelector('.popup-players');
        this._popupBtn = document.querySelector('.popup_button');
        this._popupWrap = document.querySelector('.players-name');
        this._buttonStart.addEventListener('click', this.startGame.bind(this));
        this._popupBtn.addEventListener('click', this.playersNameVerification.bind(this));
    }

    // make decorator
    // wrapMethod(method) {
    //     method();
    //     sessionStorage.set("pandemic", this);
    // }

    playersNameVerification() {
        let inputPlayerNames = this._popupWrap.querySelectorAll(".popup-input");

        for (let input = 0; input<inputPlayerNames.length; input++) {
            if (inputPlayerNames[input].value === "") {
                inputPlayerNames[input].value = "Player " + (input+1);
            }
        };
        for (let j = 0; j<inputPlayerNames.length; j++) {
            for (let i = j + 1; i<inputPlayerNames.length; i++) {
                if (inputPlayerNames[i].value === inputPlayerNames[j].value) {
                    alert("Однакові:" + inputPlayerNames[i].value);
                    return false;
                }
            }
        }
        this.startGameWithPlayers();
    }

    updateDiseaseIndicator(color, amountOfDisease) {
        this._diseasesIndicators.get(color).innerHTML = amountOfDisease;
    }

    updateDiseaseStatusIndicator(color, status) {
        // this._diseasesIndicators.get(color) -> find image and change it src
        // use switch(status)
        // Коли у хвороби змінюється статус на виліковано, то має відображатись картинка мензурки
        // Є статус, коли все виліковано, тоді має викликатись тут this.updateDiseaseIndicator(color, "x");
        switch(status) {
            case "active":
                this._diseasesIndicators.get(color).parentNode.parentNode.setAttribute("style", "background-image: url(img/disease/" + color + "-disease.png);");
                break;
            case "cured": 
                this._diseasesIndicators.get(color).parentNode.parentNode.setAttribute("style", "background-image: url(img/treating/" + color + "-treating.png);");
                break;
        }
    }

    updatePlayersDeckIndicator() {
        this._playersDeckIndicator.innerHTML = this._playersDeck.length;
    }

    updatePlayersDeckDiscard() {
        if (this._playersDeckDiscard.length === 0) {
            this.drawCardToPlayersDiscard({type:"blank"});
        } else {
            this.drawCardToPlayersDiscard(this._playersDeckDiscard[this._playersDeckDiscard.length-1]);
        }
    }

    drawCardToPlayersDiscard(card) {
        while (this._playersDeckIndicatorDiscard.firstChild) {
            this._playersDeckIndicatorDiscard.removeChild(this._playersDeckIndicatorDiscard.firstChild);
        }
        this._playersDeckIndicatorDiscard.appendChild(this.createCardEl(card, false));
    }

    updateDiseasesDeckDiscard() {
        while (this._diseaseDeckIndicatorDiscard.firstChild) {
            this._diseaseDeckIndicatorDiscard.removeChild(this._diseaseDeckIndicatorDiscard.firstChild);
        }
        this._diseaseDeckIndicatorDiscard.appendChild(this.createCardDiseaseEl(this._diseasesDeckDiscard[this._diseasesDeckDiscard.length-1]));        
    }

    updateDiseaseDeckIndicator() {
        this._diseaseDeckIndicator.innerHTML = this._diseasesDeck.length;
    }

    updateOutbrakeIndicator() {
        this._outbrakeIndicator.innerHTML = this._outbrakeAmount;
    }

    updateSpreadIndicator() {
        this._spreadIndicator.innerHTML = this.getCurrentSpreedAmount();
    }

    prepareResearchStations() {
        for (let i=0; i<6; i++) {
            this._researchStation.appendChild(City.createResearchStation());
        }
        this.appendResearchStationToCity(this._cities.get("Атланта"));
    }

    appendResearchStationToCity(city) {
        if (this._researchStation.firstChild) {
            this._researchStation.removeChild(this._researchStation.querySelector("img"));
            city._isResearchStation = true;
            city.drawResearchStation();
        }
    }

    showPopup() {
        this._popup.classList.add('popup-players-active');
    }

    hidePopup() {
        this._popup.classList.remove('popup-players-active');
        
    }

    createPopupinput() {
        for (let i=document.querySelector('.players_quantity').value; i>0; i--) {
            let text = document.createElement('p');
            text.classList.add('popup-text');
            text.innerHTML = "Гравець " + i;
            let input = document.createElement('input');
            input.classList.add('popup-input');
            input.setAttribute("data-index", i-1);
            input.setAttribute("type", "text");
            this._popupWrap.prepend(input);
            this._popupWrap.prepend(text);
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
        this._header.classList.add('show_flex');
    }

    createAllCities() {
        let aX = 23,
            aY = 33.5,
            dX = 1.7,
            dY = 2.5;
        this._cities = new Map([
            ["Атланта", new City("Атланта", "blue", aX, aY, 8)],
            ["Вашингтон", new City("Вашингтон", "blue", aX + 3 * dX, aY + 0 * dY, 7)],
            ["Нью-Йорк", new City("Нью-Йорк", "blue", aX + 5 * dX, aY - 4 * dY, 42)],
            ["Торонто", new City("Торонто", "blue", aX + 2 * dX, aY - 4 * dY, 2)],
            ["Чікаго", new City("Чікаго", "blue", aX - 1 * dX, aY - 4 * dY, 27)],
            ["Сан-Франциско", new City("Сан-Франциско", "blue", aX - 6 * dX, aY - 1 * dY, 15)],
            ["Мадрид", new City("Мадрид", "blue", aX + 11.5 * dX, aY - 1.5 * dY, 13)],
            ["Лондон", new City("Лондон", "blue", aX + 11.7 * dX, aY - 5.5 * dY, 23)],
            ["Париж", new City("Париж", "blue", aX + 14.5 * dX, aY - 3.7 * dY, 29)],
            ["Берлін", new City("Берлін", "blue", aX + 15.5 * dX, aY - 7 * dY, 4)],
            ["Мілан", new City("Мілан", "blue", aX + 16.5 * dX, aY - 4 * dY, 12)],
            ["Санкт-Петербург", new City("Санкт-Петербург", "blue", aX + 19 * dX, aY - 7 * dY, 9)],
            ["Київ", new City("Київ", "black", aX + 21 * dX, aY - 4 * dY, 1)],
            ["Тегеран", new City("Тегеран", "black", aX + 23.5 * dX, aY - 2.5 * dY, 20)],
            ["Багдад", new City("Багдад", "black", aX + 21 * dX, aY - 0 * dY, 17)],
            ["Стамбул", new City("Стамбул", "black", aX + 18.5 * dX, aY - 1.3 * dY, 33)],
            ["Алжир", new City("Алжир", "black", aX + 15 * dX, aY + 1 * dY, 3)],
            ["Каїр", new City("Каїр", "black", aX + 17.5 * dX, aY + 1.5 * dY, 36)],
            ["Ер-Ріяд", new City("Ер-Ріяд", "black", aX + 21 * dX, aY + 4 * dY, 11)],
            ["Карачі", new City("Карачі", "black", aX + 24.5 * dX, aY + 2.5 * dY, 43)],
            ["Делі", new City("Делі", "black", aX + 27 * dX, aY + 1 * dY, 45)],
            ["Мумбаї", new City("Мумбаї", "black", aX + 25.5 * dX, aY + 6 * dY, 38)],
            ["Калькутта", new City("Калькутта", "black", aX + 29 * dX, aY + 2 * dY, 35)],
            ["Ченнаї", new City("Ченнаї", "black", aX + 27.5 * dX, aY + 8 * dY, 25)],
            ["Бангкок", new City("Бангкок", "red", aX + 30 * dX, aY + 6 * dY, 19)],
            ["Гонконг", new City("Гонконг", "red", aX + 32 * dX, aY + 3.5 * dY, 18)],
            ["Джакарта", new City("Джакарта", "red", aX + 30 * dX, aY + 11 * dY, 47)],
            ["Хошимін", new City("Хошимін", "red", aX + 32.7 * dX, aY + 9.5 * dY, 21)],
            ["Маніла", new City("Маніла", "red", aX + 36.5 * dX, aY + 9.5 * dY, 44)],
            ["Сідней", new City("Сідней", "red", aX + 38.5 * dX, aY + 19.5 * dY, 5)],
            ["Тайбей", new City("Тайбей", "red", aX + 36 * dX, aY + 3 * dY, 22)],
            ["Шанхай", new City("Шанхай", "red", aX + 32 * dX, aY + 0 * dY,32)],
            ["Пекін", new City("Пекін", "red", aX + 32 * dX, aY - 3 * dY, 39)],
            ["Сеул", new City("Сеул", "red", aX + 35 * dX, aY - 3 * dY, 46)],
            ["Токіо", new City("Токіо", "red", aX + 38 * dX, aY - 2.5 * dY, 31)],
            ["Осака", new City("Осака", "red", aX + 38 * dX, aY + 2 * dY, 0)],
            ["Хартум", new City("Хартум", "yellow", aX + 19 * dX, aY + 7 * dY, 10)],
            ["Йоганнесбург", new City("Йоганнесбург", "yellow", aX + 18.5 * dX, aY + 17 * dY, 6)],
            ["Кіншаса", new City("Кіншаса", "yellow", aX + 16 * dX, aY + 11.5 * dY, 26)],
            ["Лагос", new City("Лагос", "yellow", aX + 14 * dX, aY + 7.5 * dY, 30)],
            ["Сан-Паулу", new City("Сан-Паулу", "yellow", aX + 7 * dX, aY + 16 * dY, 41)],
            ["Буенос-Айрес", new City("Буенос-Айрес", "yellow", aX + 4.5 * dX, aY + 19 * dY, 34)],
            ["Сантьяго", new City("Сантьяго", "yellow", aX + 1 * dX, aY + 21 * dY, 16)],
            ["Ліма", new City("Ліма", "yellow", aX + 1 * dX, aY + 15 * dY, 28)],
            ["Богота", new City("Богота", "yellow", aX + 1.5 * dX, aY + 9 * dY, 24)],
            ["Мехіко", new City("Мехіко", "yellow", aX - 2 * dX, aY + 5 * dY, 40)],
            ["Лос-Анджелес", new City("Лос-Анджелес", "yellow", aX - 5 * dX, aY + 3 * dY, 37)],
            ["Майамі", new City("Майамі", "yellow", aX + 3 * dX, aY + 5 * dY, 14)]
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
        this._cities.get("Мілан").addNeigbours(["Берлін", "Париж", "Стамбул"]);
        this._cities.get("Санкт-Петербург").addNeigbours(["Берлін", "Стамбул", "Київ"]);
        this._cities.get("Київ").addNeigbours(["Стамбул", "Санкт-Петербург", "Тегеран"]);
        this._cities.get("Тегеран").addNeigbours(["Київ", "Багдад", "Карачі", "Делі"]);
        this._cities.get("Багдад").addNeigbours(["Стамбул", "Тегеран", "Каїр", "Ер-Ріяд", "Карачі"]);
        this._cities.get("Стамбул").addNeigbours(["Мілан", "Алжир", "Київ", "Каїр", "Багдад"]);
        this._cities.get("Алжир").addNeigbours(["Мадрид", "Париж", "Стамбул", "Каїр"]);
        this._cities.get("Каїр").addNeigbours(["Стамбул", "Алжир", "Хартум", "Ер-Ріяд"]);
        this._cities.get("Ер-Ріяд").addNeigbours(["Каїр", "Багдад", "Карачі"]);
        this._cities.get("Карачі").addNeigbours(["Ер-Ріяд", "Тегеран", "Делі", "Мумбаї", "Багдад"]);
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
            return true;
        }
        return false;
    }

    drawEndPairsRoad(current, neighbour) {
        let fakeCity = new City(neighbour._name, neighbour._mainColor, (current._coordX > neighbour._coordX) ? 99-City.elWidth : 0, neighbour._coordY);
        this._worldMap.appendChild(fakeCity.drawFakeCity());
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
    
    createPlayersDeck() {
        this._playersDeck = [];
        this._cities.forEach(city => this._playersDeck.push({
            type:"city", 
            structure: {
                cityName: city._name,
                cityColor: city._mainColor
            }
        }));
        this._playersDeck.push({
            type:"special",
            structure: {
                name: "Одна тиха ніч",
                shortname: "ОТН",
                text: "Пропустіть фазу виявлення хвороб (не беріть карти хвороб)",
                type: "night"
            }
        });
        this._playersDeck.push({
            type:"special",
            structure: {
                name: "Прогноз",
                shortname: "ПЗ",
                text: "Візьміть 6 верхніх карт з колоди карт хвороб, подивіться на них, розташуйте в потрібному вам порядку і поверніть назад на верх колоди",
                type: "forecast"
            }
        });
        this._playersDeck.push({
            type:"special",
            structure: {
                name: "Урядовий гранд",
                shortname: "УГ",
                text: "Побудуйте 1 дослідницьку станцію в будь-якому місті (без використання карти міста)",
                type: "grant"
            }
        });
        this._playersDeck.push({
            type:"special",
            structure: {
                name: "Перекидання",
                shortname: "ПН",
                text: "Пересуньте 1 фішку в будь-яке місто. Пересувати фішки можна тільки за згодою їх власників",
                type: "transfer"
            }
        });
        this._playersDeck.push({
            type:"special",
            structure: {
                name: "Імунітет",
                shortname: "ІА",
                text: "Приберіть з гри 1 будь-яку карту зі скидання карток хвороб. Ви можете зіграти цю карту між інфікуванням та загостренням під час застосування карт епідемій.",
                type: "immunity"
            }
        });
        this._playersDeckDiscard = [];
    }

    createEpidemia() {
        for (let i=0; i<this.complexity(document.querySelector(".сomplexity_quantity").value); i++){
            this._playersDeck.push({
                type: "epidemia",
                structure: {}
            })
        }
    }

    complexity(compl) {
        switch(compl){
            case "Легка": return 4;
            case "Середня": return 5;
            case "Складна": return 6;
            default: return 4;
        }
    }

    shuffleDeck(deck) {
        deck = deck.sort(function() {
            return Math.random() - 0.5;
        });
    }

    createPlayers() {
        let inputPlayerNames = this._popupWrap.querySelectorAll(".popup-input");
        this._playersList = new Map();
        inputPlayerNames.forEach(element => {
            this._playersList.set(element.value, element.getAttribute("data-index"));
        });
        let professionList = ["contingency-planner", "dispatcher", "medic", "operation-expert", "quarantine-specialist", "researcher", "scientist"];
        this._players = new Map();
        this._playersList.forEach((index, name) => {
            let number = Math.floor(Math.random()*professionList.length);
            let current =  professionList[number];
            professionList.splice(number, 1);
            this._players.set(name, {
                profession: current,
                location: null,
                hand: []
            });
        });
    }

    startingHand() {
        this._players.forEach((player) => {
            for (let i = 0; i < 6 - this._players.size; i++) {
                player.hand.push(this.takeCardFromDeck(this._playersDeck));
            }
        });
    }

    createPlayersHands() {
        let footer = document.querySelector(".footer");
        this._playersHand = [];
        this._currentTurns = [];
        for (let i = 0; i < this._players.size; i++) {
            let hand = document.createElement('div');
            hand.classList.add("hand");
            let role = document.createElement('div');
            role.classList.add("role");
            let handCards = document.createElement('div');
            handCards.classList.add("handCards");
            let turn = document.createElement('div');
            turn.classList.add("turn");
            let top = document.createElement('div');
            top.classList.add("top");

            top.appendChild(role);
            top.appendChild(turn);
            hand.appendChild(top);
            hand.appendChild(handCards);
            footer.appendChild(hand);

            this._currentTurns.push(turn);
            this._playersHand.push(handCards); 
        }
    }

    chooseFirstPlayer() {
        let firstPlayer = -1;
        let biggestPopulationInHand = 0;
        this._players.forEach((player, key) => {
            let biggestPopulation = 0;
            player.hand.forEach(card => {
                if (card.type === "city" && this._cities.get(card.structure.cityName)._populationIndex > biggestPopulation) {
                    biggestPopulation = this._cities.get(card.structure.cityName)._populationIndex;
                }    
            });
            if (biggestPopulation > biggestPopulationInHand) {
                biggestPopulationInHand = biggestPopulation;
                firstPlayer = key;
            }
        });
        return firstPlayer;
    }

    drawAllPlayerNames() {
        this._playersList.forEach((index, name) => {
            this._currentTurns[index].innerHTML = name;
        });
    }

    drawCurrentTurn() {
        this._currentTurns[this._currentTurn].setAttribute("style", "background-color: green;");
    }

    drawPreviousTurn() {
        this._currentTurns[this._currentTurn].setAttribute("style", "background-color: red;");
    }

    swithTurn() {
        this.drawPreviousTurn();
        this._currentTurn--;
        if (this._currentTurn === -1) {
            this._currentTurn = this._currentTurns.length - 1;
        }
        this.drawCurrentTurn();
    }

    drawHandByIndex(index) {
        this.drawHand(this._playersHand[index]);
    }

    drawAllHands() {
        let playerIter = this._players.entries();
        this._playersHand.forEach((element) => {
            this.drawHand(element, playerIter.next().value[1].hand);
        });
    }

    drawHand(hand, playerCards) {
        playerCards.forEach((card) => {
            this.drawCardToHand(hand, card);
        });
    }

    drawCardToHand(hand, card) {
        hand.appendChild(this.createCardEl(card, true));
    }

    // document.querySelector('.card__item').addEventListener('mouseenter', function(e) {
    //     e.preventDefault();
    //     console.log(this);
    // })

    eraseCard(hand, card) {
        let name = "";
        if (card.type === "city") {
            name = card.structure.cityName;
        } else if (card.type === "special") {
            name = card.structure.name;
        }
        hand.removeChild(hand.querySelector("[data-name='" + name + "']"));
    }

    movePlayerToCity(player, city) {
        (player.location !== null) ? player.location.removePlayer(player) : {}
        player.location = city;
        city.drawPlayer(player);
    }

    prepareStartLocationPlayers() {
        this._players.forEach(player => {
            this.movePlayerToCity(player, this._cities.get("Атланта"));
        })
    }

    createCityCardEl(card, inHand) {
        let cardblock = document.createElement("div");
        let cardInside = document.createElement("span");
        let blackCard = (card.cityColor == "black") ? "color: white;" : "";
        cardblock.setAttribute("style", "background-color:" + card.cityColor + ";" + blackCard);
        cardblock.setAttribute("data-name", card.cityName);
        cardblock.className = (inHand) ? "card__item" : "card__item_none";
        cardInside.className = "card__item-inside";
        cardInside.innerHTML = card.cityName[0] + card.cityName[card.cityName.length-1].toUpperCase();
        cardblock.appendChild(cardInside);
        return cardblock;
    }

    createSpecialCardEl(card, inHand) {
        let cardblock = document.createElement("div");
        let cardInside = document.createElement("span");
        cardblock.setAttribute("style", "background-color: white;");
        cardblock.className = (inHand) ? "card__item-special" : "card__item_none";
        cardblock.title = card.text;
        cardblock.setAttribute("data-name", card.name);
        cardInside.innerHTML = card.shortname;
        cardblock.appendChild(cardInside);
        return cardblock;
    }

    createEpidemiaCardEl() {
        let cardblock = document.createElement("div");
        let cardInside = document.createElement("span");
        cardblock.setAttribute("style", "background-color: green;");
        cardblock.className = "card__item_none";
        cardblock.title = "Епідемія";
        cardblock.setAttribute("data-name", "epidemia");
        cardInside.innerHTML = "☣";
        cardblock.appendChild(cardInside);
        return cardblock;
    }

    createCardDiseaseEl(card) {
        let createBlock = document.createElement('div');
        let cardInside = document.createElement("span");
        createBlock.className = card;
        createBlock.className = "illnes__discard";
        (this._cities.get(card)._mainColor === "black") ? createBlock.classList.add("black__text") : {}
        cardInside.innerHTML = card[0] + card[card.length-1].toUpperCase();
        createBlock.setAttribute("style", "background:" + this._cities.get(card)._mainColor + ";");
        createBlock.setAttribute("data-name", card);
        createBlock.appendChild(cardInside);
        return createBlock;
    }

    createCardEl(card, inHand) {
        switch (card.type) {
            case "city": return this.createCityCardEl(card.structure, inHand); break;
            case "special": return this.createSpecialCardEl(card.structure, inHand); break;
            case "epidemia": return this.createEpidemiaCardEl(); break;
            default: return document.createElement("div"); break; // better send blank div or have some try-catch
        }
    }

    takeCardFromDeck(deck) {
        return deck.pop();
    }

    putCardsToDeck(deck, cards) {
        Array.prototype.push.apply(deck, cards);
    }

    startDiseaseSpread() {
        for (let j=3; j>0; j--) {
            for (let i=0; i<3; i++) {
                let cityCard = this._cities.get(this.takeCardFromDeck(this._diseasesDeck));
                cityCard.diseaseCardBySpecialRule(cityCard._mainColor, j);
                this._diseasesAmount.set(cityCard._mainColor, this._diseasesAmount.get(cityCard._mainColor) - j);
                this.putCardsToDeck(this._diseasesDeckDiscard, new Array(cityCard._name));
            }
        }
    }

    initializeRateTrack() {
        this._rateTrack = [2,2,2,3,3,4,4];
        this._indexRateTrack = 0;
    }

    getCurrentSpreedAmount() {
        return this._rateTrack[this._indexRateTrack];
    }

    moveSpreedMarker() {
        this._indexRateTrack++;
        if (this._indexRateTrack >= this._rateTrack.length) {
            this._indexRateTrack--;
        }
    }

    initializeIndicators() {
        this._diseasesAmount = new Map([
            ["yellow", 24],
            ["blue", 24],
            ["red", 24],
            ["black", 24]
        ]);
        this._outbrakeAmount = 0;
        this.initializeRateTrack();
    }

    prepareStartBoard() {
        this.cleanGameBoard();
        this.initializeIndicators();
        this.createAllCities();
        this.drawStartMap();
        this.prepareResearchStations();
        // this.createPlayerDeck
        this.createDiseasesDeck();
        this.createPlayersDeck();
        this.shuffleDeck(this._diseasesDeck);
        this.shuffleDeck(this._playersDeck);
        this.createPlayersHands();
        this.startingHand();
        this.drawAllHands();
        this.createEpidemia();
        this.shuffleDeck(this._playersDeck);
        this.drawAllPlayerNames();
        this.prepareStartLocationPlayers();
        this._currentTurn = this._playersList.get(this.chooseFirstPlayer());
        this.drawCurrentTurn();
        // this.swithTurn();
        // console.log(this._playersDeck.length);
        // console.log(this._players);
        this.startDiseaseSpread();

        // console.log(this._diseasesDeckDiscard);
        // console.log(this._diseasesDeck);
        this.updatePlayersDeckIndicator();

        let takenCard1 = this.takeCardFromDeck(this._playersDeck);
        this._playersDeckDiscard.push(takenCard1);
        this.updatePlayersDeckDiscard();

        this._diseasesAmount.forEach((value, key) => {
            this.updateDiseaseIndicator(key, value);
        });
        this.updateOutbrakeIndicator();
        this.updateSpreadIndicator();
        this.updateDiseaseDeckIndicator();
        this.updateDiseasesDeckDiscard();

        ///

        /* Это нужно
        ! let toakenCard = this.takeCardFromDeck(this._playersDeck);
        this._players.get(0).push(toakenCard);
        // console.log(this._players.get(0));
        this.drawCard(this._playersHand[0], toakenCard);
        let delCard = this._players.get(1)[2];
        let findDel = this._players.get(1).indexOf(delCard);
        if (findDel != -1) {
            this._players.get(0).splice(findDel, 1);
        }
        this.eraseCard(this._playersHand[1], delCard);
        ! console.log(delCard);*/

        // this.updateDiseaseStatusIndicator("yellow", "cured");
        // this.updateDiseaseStatusIndicator("yellow", "active");
        // this.updateDiseaseStatusIndicator("red", "cured");
        // this.updateDiseaseStatusIndicator("blue", "cured");
        // this.updateDiseaseStatusIndicator("black", "cured");
    }

    showGameBoard() {
        this.showBoardElements();
        this.prepareStartBoard();
    }

    startGame() {
        this.hideStartMenu();
        this.createPopupinput();
        this.showPopup();
    }

    startGameWithPlayers() {
        this.hidePopup();
        this.createPlayers();
        this.showGameBoard();
    }
}


const pandemic = new Game();