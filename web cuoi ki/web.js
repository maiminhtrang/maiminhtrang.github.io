window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

const navLinks = document.querySelectorAll('.navbar a');
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        navLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const dotsContainer = document.getElementById('carouselDots');
    let activeIndex = 0;

    slides.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.dataset.index = index;
        
        dot.addEventListener('click', () => {
            activeIndex = index;
            updateSlider();
        });
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    slides.forEach((slide, index) => {
        slide.addEventListener('click', () => {
            if (index !== activeIndex) {
                activeIndex = index;
                updateSlider();
            }
        });
    });

    function updateSlider() {
        slides.forEach((slide, i) => {
            slide.classList.remove('active', 'prev', 'next');

            if (i === activeIndex) {
                slide.classList.add('active');
            } else if (i === activeIndex - 1 || (activeIndex === 0 && i === slides.length - 1)) {
                slide.classList.add('prev');
            } else if (i === activeIndex + 1 || (activeIndex === slides.length - 1 && i === 0)) {
                slide.classList.add('next');
            }
        });

        dots.forEach(dot => dot.classList.remove('active'));
        dots[activeIndex].classList.add('active');
    }

    updateSlider();
});