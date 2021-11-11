import "../scss/index.scss";
import { createPopper } from '@popperjs/core';
import { Dropdown, Collapse, Button } from 'bootstrap';
import LazyLoad from "vanilla-lazyload";
import Swiper from 'swiper/bundle';

import Headroom from "headroom.js";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

import 'fslightbox';

// import './maps';

const body = document.querySelector('body');

const hamburger = () => {
    const btn = document.querySelector('.hamburger');
    const header = document.querySelector('header');
    const nav = document.querySelector('.nav-menu');
    btn.addEventListener('click',() => {
        btn.classList.toggle('is-active');
        body.classList.toggle('menu-open');
        nav.classList.toggle('active');
        header.classList.toggle('header--translateFix');
            menuAnimation();
    })
}

const lazyload = () => {
    const lazyLoadInstance = new LazyLoad({
        elements_selector: ".lazy",
    });
}

const scrollTo = () => {
    const scrollToButtons = document.querySelectorAll('.js-scrollTo');
    scrollToButtons.forEach(button => {
        const targetId = button.dataset.scrolltoid;
        const target = document.querySelector(targetId);
        if(target){
            button.addEventListener('click', () => {
                target.scrollIntoView();
            })
        }
    })
}

const initSwiper = () => {
    const imageSwiperCheck = document.querySelectorAll('.js-imageSwiper-swiper');

    if (imageSwiperCheck.length) {
        imageSwiperCheck.forEach(swiper => {
            const id = swiper.classList[0].replace('-container','').replace('swiper-','');
            const swiperContainerClass = "." + swiper.classList[0] + "";
            const prevButtonClass = ".swiper-" + id + "-prev";
            const nextButtonClass = ".swiper-" + id + "-next";
            const bulletClass = ".swiper-" + id + "-pagination";
            const prevButton = document.querySelector(prevButtonClass);
            const nextButton = document.querySelector(nextButtonClass);
            const imageSwiper = new Swiper(swiperContainerClass, {
                slidesPerView: 1,
                grabCursor: true,
                watchOverflow: true,
                spaceBetween: 50,
                navigation: {
                    nextEl: nextButtonClass,
                    prevEl: prevButtonClass,
                },
                pagination: {
                    el: bulletClass,
                    type: 'bullets',
                    clickable: true,
                },
            });

            checkActiveSlide(imageSwiper, prevButton, nextButton);

            imageSwiper.on('slideChange', function () {
                checkActiveSlide(imageSwiper, prevButton, nextButton);
            });
        });
    }
}

const checkActiveSlide = (swiper,prevButton,nextButton) => {
    if(swiper.isBeginning){
        prevButton.classList.add('invis');
    }else{
        prevButton.classList.remove('invis');
    }

    if(swiper.isEnd){
        nextButton.classList.add('invis');
    }else{
        nextButton.classList.remove('invis');
    }
}

const bootstrapValidation = () => {
    var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function(form) {
        form.addEventListener('submit', function(event) {
            if (form.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        }, false);
    });
}

const headroomInit = () => {
    if(Headroom.cutsTheMustard) {
        const header = document.querySelector('header');
        if(header){
            var options = {
                offset: 111,
                classes : {
                    // when element is initialised
                    initial : "header--initial",
                    // when scrolling up
                    pinned: "header--pinned",
                    // when scrolling down
                    unpinned : "header--unpinned",
                    // when above offset
                    top : "header--top",
                    // when below offset
                    notTop : "header--notTop",
                    // when at bottom of scroll area
                    bottom : "header--bottom",
                    // when not at bottom of scroll area
                    notBottom : "header--not-bottom",
                },
            };
            let headroom  = new Headroom(header, options);

            headroom.init();
        }
    }
}

const changeProductContent = () => {
    const products = document.querySelectorAll('.js-productSlide');

    products.forEach(p => {
        const id = p.dataset.id;
        p.addEventListener('click', () => {
            productContentSwiper.slideTo(id - 1);
            products.forEach(p => {
                p.classList.remove('active');
            })
            p.classList.add('active')
        })
    })
}

const windowResizeHandler = () => {
    const form = document.querySelector('.js-form');
    const maps = document.querySelector('.maps');
    if(form){
        maps.style.height = form.offsetHeight - 40 + 'px';
    }
}

const menuAnimation = () => {
    const tl = gsap.timeline();
    tl.from('.nav-item',{
        duration: .5, opacity: 0, y:-20,stagger: .2
    })
}

window.onresize = windowResizeHandler;
window.dispatchEvent(new Event('resize'));

window.onload = (event) => {

};

bootstrapValidation();
hamburger();
lazyload();
// initSwiper();
headroomInit();
scrollTo();