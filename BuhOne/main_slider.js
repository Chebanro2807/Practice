class Slider {
    constructor(){

        this._currentSlide = 0;

        this._root = document.querySelector('.slider_wrap');
        this._slides = document.querySelectorAll('.item')

        this._nextBtn = document.querySelector('.slider__control-right');
        this._prevBtn = document.querySelector('.slider__control-left');

        this._nextBtn.addEventListener('click', this.next.bind(this));
        this._prevBtn.addEventListener('click', this.prev.bind(this));
    }


    next() {
        return this.show(this._currentSlide + 1);
    }

    prev() {
        return this.show(this._currentSlide - 1);
    }
    show(nextSlideNumber){
        const previousSlideNumber = this._currentSlide;

        this._currentSlide = nextSlideNumber;

        this.render(previousSlideNumber,nextSlideNumber);
    }

    render(previousSlideNumber,nextSlideNumber){
        console.log({previousSlideNumber,nextSlideNumber})
    }

}

new Slider()