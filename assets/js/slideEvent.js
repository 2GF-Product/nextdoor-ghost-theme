/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-mixed-spaces-and-tabs */
// eslint-disable-next-line no-var
var swiper = new Swiper('.mySwiper', {
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    },
    slidesPerView: 1,
    spaceBetween: 10,
    // init: false,
    pagination: {
        el: '.swiper-pagination',
        clickable: true
    },

    breakpoints: {
        620: {
            slidesPerView: 1,
            spaceBetween: 20
        },
        680: {
            slidesPerView: 2,
            spaceBetween: 40
        },
        920: {
            slidesPerView: 3,
            spaceBetween: 40
        },
        1240: {
            slidesPerView: 4,
            spaceBetween: 50
        }
    }
    // eslint-disable-next-line indent
});
