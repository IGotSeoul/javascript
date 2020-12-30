import { getElement } from '../utils.js';

//gets the elements from document
const cartOverlay = getElement('.cart-overlay');
const closeCartBtn = getElement('.cart-close');
const toggleCartBtn = getElement('.toggle-cart');

//on click add show to class list
toggleCartBtn.addEventListener('click', () => {
    cartOverlay.classList.add('show');
} )

//on click remove show from class list
closeCartBtn.addEventListener('click', () => {
    cartOverlay.classList.remove('show');
} )

// shows sidebar 
export const openCart = () => {
    cartOverlay.classList.add('show');
};
