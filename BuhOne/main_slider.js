class Slider {
    constructor(){

        this._currentSlide = 0;

        this._root = document.querySelector('.slider_wrap');
        this._slides = document.querySelectorAll('.item');

        this._nextBtn = document.querySelector('.slider__control-right');
        this._prevBtn = document.querySelector('.slider__control-left');

        this._nextBtn.addEventListener('click', this.next.bind(this));
        this._prevBtn.addEventListener('click', this.prev.bind(this));

        this.showNextAfter(5000);
    }

    showNextAfter(ms) {
        return delay(ms)
            .then(() => this.next())
            .then(() => this.showNextAfter(ms));
    }

    next() {
        return this.show(this._currentSlide + 1);
    }

    prev() {
        return this.show(this._currentSlide - 1);
    }

    show(nextSlideNumber){
        const previousSlideNumber = this._currentSlide;

        if (nextSlideNumber < 0) {
            nextSlideNumber = this._slides.length - Math.abs(nextSlideNumber);
        }
        if (nextSlideNumber > this._slides.length-1){
            nextSlideNumber = nextSlideNumber % this._slides.length;
        }

        this._currentSlide = nextSlideNumber;

        this.render(previousSlideNumber,nextSlideNumber);
    }

    
    hideSlide(slideNumber){
        const slide = this._slides[slideNumber];
        slide.classList.add('item-hide');
    }

    showSlide(slideNumber){
        const slide = this._slides[slideNumber];
        slide.classList.remove('item-hide');
    }
     
    render(previousSlideNumber,nextSlideNumber){
        if (previousSlideNumber!==nextSlideNumber){
            return Promise.all([
                this.hideSlide(previousSlideNumber),
                delay(0).then(() =>this.showSlide(nextSlideNumber))
            ]);
        }
        return Promise.resolve();
    }
}

function delay(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

new Slider()