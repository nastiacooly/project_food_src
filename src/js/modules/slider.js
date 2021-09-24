function slider({container, slide, prevArrow, nextArrow, current, total, wrapper, field, indicators}) {
    //Slider with navigation dots
    //elements
    let slideIndex = 1;
    let slideOffset = 0;
    const slides = document.querySelectorAll(slide),
    slider = document.querySelector(container),
    prevSlideBtn = document.querySelector(prevArrow),
    nextSlideBtn = document.querySelector(nextArrow),
    currentSlideIndex = document.querySelector(current),
    totalSlidesNumber = document.querySelector(total),
    slidesField = document.querySelector(field),
    slidesWrapper = document.querySelector(wrapper),
    widthForSlider = window.getComputedStyle(slidesWrapper).width;


    function deleteNonDigits(str) { //удаляет всё, кроме цифр, в строке
        return +str.replace(/\D/g, "");
    }
    
    const width = deleteNonDigits(widthForSlider); //ширина в цифрах из CSS (без приписки px)

    function changeTotalSlidesNumberIndicator(totalIndicator) {
        if (slides.length < 10) {
            totalIndicator.textContent = `0${slides.length}`;
        } else {
            totalIndicator.textContent = slides.length;
        }
    }

    function changeCurrentSlideNumberIndicator(currentIndicator) {
        if (slides.length < 10) {
            currentIndicator.textContent = `0${slideIndex}`;
        } else {
            currentIndicator.textContent = slideIndex;
        }
    }

    changeTotalSlidesNumberIndicator(totalSlidesNumber);
    changeCurrentSlideNumberIndicator(currentSlideIndex);

    slidesField.style.display = 'flex';
    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.transition = '0.5s all';
    slidesWrapper.style.overflow = 'hidden';
    slides.forEach(slide => {
        slide.style.width = widthForSlider; //чтобы все картинки были одинаковой ширины
    });

    //for creating navigation dots
    slider.style.position = 'relative';
    const dots = [];

    const sliderDots = document.createElement('ol');
    sliderDots.classList.add(indicators);
    slider.append(sliderDots);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.classList.add('dot');
        dot.setAttribute('data-slide-to', i + 1);

        if (i == 0) {
            dot.style.opacity = 1;
        }

        sliderDots.append(dot);
        dots.push(dot);
    }

    function lightenActiveDot() {
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1;
    }
    //end of creating nav dots

    nextSlideBtn.addEventListener('click', () => {
        if (slideOffset == width * (slides.length - 1)) {
            slideOffset = 0;
        } else {
            slideOffset += width;
        }

        slidesField.style.transform = `translateX(-${slideOffset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        changeCurrentSlideNumberIndicator(currentSlideIndex);

        lightenActiveDot();
    });

    prevSlideBtn.addEventListener('click', () => {
        if (slideOffset == 0) {
            slideOffset = width * (slides.length - 1);
        } else {
            slideOffset -= width;
        }

        slidesField.style.transform = `translateX(-${slideOffset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        changeCurrentSlideNumberIndicator(currentSlideIndex);

        lightenActiveDot();
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            slideOffset = width * (slideTo - 1);

            slidesField.style.transform = `translateX(-${slideOffset}px)`;

            changeCurrentSlideNumberIndicator(currentSlideIndex);

            lightenActiveDot();
        });
    });
    //end of slider

    /* Slider - First option

    showSlideByIndex(slideIndex);

    if (slides.length < 10) {
        totalSlidesNumber.textContent = `0${slides.length}`;
    } else {
        totalSlidesNumber.textContent = slides.length;
    }

    function showSlideByIndex(index) {

        if (index > slides.length) {
            slideIndex = 1; //если долистали до последнего слайда, снова включаем первый
        }

        if (index < 1) {
            slideIndex = slides.length; //если листаем влево от первого слайда, то включаем последний
        }

        slides.forEach(slide => slide.classList.add('hide'));
        slides[slideIndex - 1].classList.add('show');
        slides[slideIndex - 1].classList.remove('hide');

        if (slides.length < 10) { //приписываем нолик маленьким цифрам
            currentSlideIndex.textContent = `0${slideIndex}`;
        } else {
            currentSlideIndex.textContent = `${slideIndex}`;
        }
    }

    function changeSlideIndexByN(n) {
        showSlideByIndex(slideIndex += n);
    }

    prevSlideBtn.addEventListener('click', () => {
        changeSlideIndexByN(-1);
    });

    nextSlideBtn.addEventListener('click', () => {
        changeSlideIndexByN(1);
    }); */
}

export default slider;