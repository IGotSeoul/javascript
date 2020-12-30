import { getElement } from '../utils.js';
import display from '../displayProducts.js';
const setupSearch = (store) => {
    //input form is search box
    const form = getElement('.input-form');
    //what you are searching for
    const nameInput = getElement('.search-input');
    //keyup = whenever you input a single key
    form.addEventListener('keyup',function(){
        //value of whatever is input
        const value = nameInput.value;
        if(value){
            const newStore = store.filter( (product) => {
                //all of the names of each product
                let {name} = product;
                //names are set to lowercase
                name = name.toLowerCase();
                //if name starts with whatever is input return
                if(name.startsWith(value)){
                    return product;
                }
            });
            //displays all products that match
            display(newStore, getElement('.products-container'));
            //if newstore has no elements
            if(newStore.length < 1){
                //get elements
                const products = getElement('.products-container');
                //insert innerHTML with h3 message
                products.innerHTML = `<h3 class="filter-error">sorry, no products matched your search</h3>`;
            }
        }
        else{
            //if input is empty display all items
            display(store, getElement('.products-container'));
        }
    })
};

export default setupSearch;
