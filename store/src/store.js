//getStorageItem sets to local storage
import { getStorageItem, setStorageItem } from './utils.js';

let store = getStorageItem('store');
//takes all the fetched products and creates an array of products
const setupStore = (products) => {
    //store = maps each product to array
    store = products.map((product) => 
    {
        //new const equal all of the attributes from products
        const {
            id, 
            fields: { featured, name, price, company, colors, image:img 
            },
        } = product;
        //accessing the large image in image array
        const image = img[0].thumbnails.large.url
        //return all attributes from api
        return { 
            id, featured, name, price, company, colors, image 
        };
    });
    //sets all products to local storage
    setStorageItem('store', store);
};

//pass in ID and find item from store
const findProduct = (id) => {
    let product = store.find((product)=>product.id === id)
    return product;
};

export { store, setupStore, findProduct };
