"use strict";

// importing modules
import tabs from './modules/tabs.js';
import calc from './modules/calc.js';
import cards from './modules/cards.js';
import forms from './modules/forms.js';
import modal from './modules/modal.js';
import {toggleModal} from './modules/modal.js';
import slider from './modules/slider.js';
import timer from './modules/timer.js';


window.addEventListener('DOMContentLoaded', () => {
    // Modal timer
    const modalTimer = setTimeout(() => toggleModal('.modal'), 50000); //opens modal after 50s

    // activating modules
    modal('.modal', '[data-modal="open"]', modalTimer);
    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    calc();
    cards();
    forms('form', '.modal', modalTimer);
    slider({
        container: '.offer__slider',
        slide: '.offer__slide',
        prevArrow: '.offer__slider-prev',
        nextArrow: '.offer__slider-next',
        current: '#current',
        total: '#total',
        field: '.offer__slider-innerwrapper',
        wrapper: '.offer__slider-wrapper',
        indicators: 'slider-indicators'
    });
    timer('.timer', '2021-12-31');
});