'use strict';

import 'nodelist-foreach-polyfill';
import elementClosest from 'element-closest';
elementClosest(window);
import 'formdata-polyfill';
import 'es6-promise';
import 'fetch-polyfill';
import 'mdn-polyfills/Node.prototype.append';
let padStart = require('string.prototype.padstart');
padStart.shim();
import 'es6-symbol';
import 'iterators-polyfill';

import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopup from './modules/togglePopup';
import addSmoothScrolling from './modules/smoothScrolling';
import tabs from './modules/tabs';
import slider from './modules/slider';
import changePhotos from './modules/changePhotos';
import addValidators from './modules/validators';
import calc from './modules/calculator';
import sendForm from './modules/sendForm';

//таймер
countTimer('01 August 2020');

//Меню
toggleMenu();

//popup
togglePopup();

//tabs
tabs();

//slider
slider();

//photo change
changePhotos();

//validation
addValidators();

//calculator
calc(100);

//send-ajax-form
sendForm('form1');
sendForm('form2');
sendForm('form3');

// Smooth scrolling
addSmoothScrolling();