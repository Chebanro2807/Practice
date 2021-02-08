class Nav {
    constructor() {
        this._menuEl = document.querySelector('.header_container');
        this._hamburgerEl = document.querySelector('.transform-hamburger');
        this._navEl = document.querySelector('.section_header');

        this._hamburgerEl.addEventListener('click', this.toggle.bind(this));
    }

    show() {
        this._hamburgerEl.classList.add('transform-hamburger--transformed');
        this._navEl.classList.add('menu__wrapper--open');
    }

    hide() {
        this._hamburgerEl.classList.remove('transform-hamburger--transformed');
        this._navEl.classList.remove('menu__wrapper--open');
    }

    toggle() {
        this._hamburgerEl.classList.toggle('transform-hamburger--transformed');
        this._navEl.classList.toggle('menu__wrapper--open');
    }
}

new Nav();