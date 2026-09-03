window.addEventListener("load", function () {
    const slider = document.querySelector(".slider__inside");
    let slides = Array.from(slider.children);
    let nextSlayde = true;
    
    const indicators = document.querySelector(".indicators");
    slides.forEach(() => {
        const indicator = document.createElement("div");
        indicator.classList.add("indicators__item");
        indicators.appendChild(indicator);
    });
    Array.from(indicators.children)[0].classList.add("indicators__item_active");



    const firstClone = slides[0].cloneNode(true);
    const lastClone = slides[slides.length - 1].cloneNode(true);
    slider.appendChild(firstClone);
    slider.insertBefore(lastClone, slides[0]);

    slides = Array.from(slider.children);


    let indexSlayde = 1;
    const widthSlayde = slider.parentElement.offsetWidth;
    let shiftSlayder = -widthSlayde;
    shift();

    let timer;
    function timerNextSlayde() {
        timer = setInterval(() => {
            setIndexSlayde(indexSlayde + 1);
            if (indexSlayde < slides.length) {
                shiftSlayder -= widthSlayde;
                shift();
            } else {
                slider.style.transform = `translateX(0px)`;
                shiftSlayder = 0;
                setIndexSlayde(0);
            }
        }, 10000)
    };


    const sliderButtons = document.querySelectorAll(".button-slider");
    sliderButtons.forEach(button => {
        button.addEventListener("click", () => {
            if (nextSlayde) {
                nextSlayde = false;
                clearInterval(timer);
                if (button.classList.contains("right")) {
                    shiftSlayder -= widthSlayde;
                    setIndexSlayde(indexSlayde + 1);
                } else {
                    shiftSlayder += widthSlayde;
                    setIndexSlayde(indexSlayde - 1);
                };
                shift();
                timerNextSlayde(timer);
                button.classList.add("button-slider_no-active");
                setTimeout(() => {
                    button.classList.remove("button-slider_no-active");
                }, 500);
            }
        });
    });

    timerNextSlayde(timer);
    function shift() {
        slider.style.transform = `translateX(${shiftSlayder}px)`;
        let animation = true;
        if (indexSlayde >= slides.length - 1) {
            setIndexSlayde(1);
            shiftSlayder = -widthSlayde;
            animation = false;
        } else if (indexSlayde <= 0) {
            setIndexSlayde(slides.length - 2);
            shiftSlayder -= widthSlayde * 6;
            animation = false;
        }
        setTransition(animation);
    }

    function setTransition(enable) {
        if (enable) {
            slider.style.transition = "transform 0.5s ease";
        }
        slider.addEventListener("transitionend", function transitionEnd(event) {
            if (event.propertyName != "transform") {
                return;
            }

            slider.removeEventListener("transitionend", transitionEnd);

            if (!enable) {
                slider.style.transition = "none";
                slider.style.transform = `translateX(${shiftSlayder}px)`;
            }
        });
        nextSlayde = true;
    }

    function setIndexSlayde(newData) {
        Array.from(indicators.children).forEach(indicator => {
            indicator.classList.remove("indicators__item_active");
        });
        indexSlayde = newData;
        console.log(indexSlayde);
        if (indexSlayde < slides.length - 1 && indexSlayde != 0) {
            Array.from(indicators.children)[indexSlayde - 1].classList.add("indicators__item_active");
        } else {
            console.log(Array.from(indicators.children));
            Array.from(indicators.children)[Array.from(indicators.children).length - 1].classList.add("indicators__item_active");
        }
    }
});