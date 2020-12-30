// global imports
import '../toggleSidebar.js';
import '../cart/toggleCart.js';
import '../cart/setupCart.js';
// specific
import { addToCart } from '../cart/setupCart.js';
import { singleProductUrl, getElement, formatPrice } from '../utils.js';

// selections from DOM
const loading = getElement('.page-loading');
const centerDOM = getElement('.single-product-center');
const pageTitleDOM = getElement('.page-hero-title');
const imgDOM = getElement('.single-product-img');
const titleDOM = getElement('.single-product-title');
const companyDOM = getElement('.single-product-company');
const priceDOM = getElement('.single-product-price');
const colorsDOM = getElement('.single-product-colors');
const descDOM = getElement('.single-product-desc');
const cartBtn = getElement('.addToCartBtn');

// cart product
let productID;
// let productID;

// show product when page loads
window.addEventListener('DOMContentLoaded', async () => {
    //you will get ID of product
    const urlID = window.location.search;

    try {
        //fetch product and ID from browser
    const response = await fetch(`${singleProductUrl}${urlID}`);
    //if response is valid 
    if (response.status >= 200 && response.status <= 299){
        //get product from json 
        const product = await response.json();
        //grab data from product
        const {id, fields} = product;
        //assign product id to id from json
        productID = id;

        //gets all the variables from fields (API)
        const {name, company, price, colors, description} = fields;
        //gets image
        const image = fields.image[0].thumbnails.large.url;
        //set values
        //sets title
        document.title = `${name.toUpperCase()} | Comfy`;
        //sets page title
        pageTitleDOM.textContent = `Home / ${name}`;
        //sets image
        imgDOM.src = image;
        //product title
        titleDOM.textContent = `${name}`;
        //adds company text
        companyDOM.textContent = `by ${company}`;
        //adds price text
        priceDOM.textContent = formatPrice(price);
        //adds description text
        descDOM.textContent = `${description}`;
        //colors are an array so it iterates through array
        colors.forEach((color)=>{
            //each array creates a span in the document
            const span = document.createElement('span');
            //access classList and add product-color
            span.classList.add('product-color');
            //add background color to each span
            span.style.backgroundColor = `${color}`;
            //append each color to colors DOM
            colorsDOM.appendChild(span);
        });
    }else{
        console.log(response.status, response.statusText);
        centerDOM.innerHTML = `
        <div>
        <h3 class="error">sorry, something went wrong</h3>
        <a href="index.html" class="btn">back home</a>
        </div>
        `;
    }
    //catch error only displays network error
} catch (error) {
    console.log(error);
}
    //hide loading after products have been generated
    loading.style.display = 'none';
});

//add to cart
cartBtn.addEventListener('click', function(){
    addToCart(productID);
})

