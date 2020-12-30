//import all products from api
import { allProductsUrl } from './utils.js';

// fetches all products from api
//async means there will always return a promise
const fetchProducts = async () => {
    //await for promise
    const response = await fetch(allProductsUrl).catch(err => console.log(err));
    //catch error then write in console log
    if (response){
        //return promise
        //json JavsScript Object Notation for storing and exchanging data 
        return response.json();
    }
    //return error
    return response;
};

export default fetchProducts;
