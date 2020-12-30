// global imports
// you will have to copy and paste in Vanilla JS
//(HTML, CSS, and JavaScript)
import './src/toggleSidebar.js';
import './src/cart/toggleCart.js';
// used to keep functionality of cart page by page
import './src/cart/setupCart.js';
// specific imports
import fetchProducts from './src/fetchProducts.js';
import { setupStore, store } from './src/store.js';
import display from './src/displayProducts.js';
import { getElement } from './src/utils.js';

//init = initialization
//async means there will always return a promise
const init = async () => {
    //await for promise
    const products = await fetchProducts();
    if(products){
        //add products to the store
        setupStore(products);
        //filters all products from store that equal featured using filter
        const featured = store.filter((product) => product.featured === true);
        display(featured, getElement('.featured-center'));
    }
}

window.addEventListener('DOMContentLoaded', init)