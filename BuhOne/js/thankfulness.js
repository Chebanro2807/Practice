class SliderThankfulness {
    constructor(){

        this._currentSlide = 0;
        this._stop = false;

        this._root = document.querySelector('.thankfulness_slider_wrap');
        this._slides = document.querySelectorAll('.thankfulness_slide_item');

        this._nextBtn = document.querySelector('.slider__control-right-thankfulness');
        this._prevBtn = document.querySelector('.slider__control-left-thankfulness');

        this._nextBtn.addEventListener('click', this.userClick.bind(this, this.next.bind(this)));
        this._prevBtn.addEventListener('click', this.userClick.bind(this, this.prev.bind(this)));

        this._allLi = document.querySelectorAll('.slider_indicators_thankfulness li');
        this._allLi.forEach(dot => {
            dot.addEventListener('click', this.userClick.bind(this, this.clickedDot.bind(this, parseInt(dot.getAttribute("data-slide")))))
        });

        this.showNextAfter(5000);
    }

    showNextAfter(ms) {
        console.log(this._stop);
        return delay(ms)
            .then(() => (!this._stop) ? this.next() : false)
            .then(() =>  (!this._stop) ? this.showNextAfter(ms) : false);
    }
    

    clickedDot(nextDot){
        // console.log("clicked")
        return this.show(nextDot);
    }

    userClick(func){
        console.log("user")
        this._stop = true;
        func();
    }

    next() {
        console.log("next")
        return this.show(this._currentSlide + 1);
    }

    prev() {
        console.log("prev")
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
        // console.log(this._currentSlide, " - ", nextSlideNumber);

        this.render(previousSlideNumber,nextSlideNumber);
    }

    
    hideSlide(slideNumber){
        let previousLi = document.querySelector('.slider_indicators_thankfulness li[data-slide="' + slideNumber + '"]');
        previousLi.classList.remove('active_thankfulness');
        const slide = this._slides[slideNumber];
        slide.classList.add('thankfulness_item_hide');
    }

    showSlide(slideNumber){
        const slide = this._slides[slideNumber];
        slide.classList.remove('thankfulness_item_hide');
        let nextLi = document.querySelector('.slider_indicators_thankfulness li[data-slide="' + slideNumber + '"]');
        nextLi.classList.add('active_thankfulness');
    }
     
    render(previousSlideNumber,nextSlideNumber){
        if (previousSlideNumber!==nextSlideNumber){
            return Promise.all([
                this.hideSlide(previousSlideNumber),
                this.showSlide(nextSlideNumber)
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

new SliderThankfulness()