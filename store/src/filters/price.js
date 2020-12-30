import { getElement } from '../utils.js';
import display from '../displayProducts.js';

const setupPrice = (store) => {
    const priceInput = getElement('.price-filter');
    const priceValue = getElement('.price-value');

    //setup filter
    let maxPrice = store.map( (product) => product.price);
    maxPrice = Math.max(...maxPrice);
    //always round up
    maxPrice = Math.ceil(maxPrice / 100);
    //max value 
    priceInput.value = maxPrice;
    priceInput.max = maxPrice;
    //lowest input is 0
    priceInput.min = 0;
    //max value will display under price bar
    priceValue.textContent = `Value : $${maxPrice}`;
    //input event = as value changes event will fire
    priceInput.addEventListener('input', function(){
        //string unless you parseInt
        const value = parseInt(priceInput.value);
        priceValue.textContent = `Value : $${value}`;
        //divide by 100 so it won't be in cents
        //display products <= value of chosen value
        let newStore = store.filter((product) => product.price / 100 <= value);
        //displays in products container
        display(newStore, getElement('.products-container'));
        if(newStore.length < 1){
            //get elements
            const products = getElement('.products-container');
            //insert innerHTML with h3 message
            products.innerHTML = `<h3 class="filter-error">sorry, no products matched your search</h3>`;
        }
    });
};

export default setupPrice;
