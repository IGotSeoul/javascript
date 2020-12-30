import { formatPrice } from './utils.js';
import { addToCart } from './cart/setupCart.js';

//products passes in along with getElements by 
const display = (products, element) => {
    //display products
    element.innerHTML = products.map((product)=>{
        const {id, name, image, price} = product;
        return `<article class='product'>
        <div class="product-container">
          <img src="${image}" class="product-img img" alt="${name}"/>
          <div class="product-icons">
            <a href="product.html?id=${id}" class="product-icon">
              <i class="fas fa-search"></i>
            </a>
            <button class="product-cart-btn product-icon" data-id="${id}">
              <i class="fas fa-shopping-cart"></i>
            </button>
          </div>
        </div>
        <footer>
          <p class="product-name">${name}</p>
          <h4 class="product-price">${formatPrice(price)}</h4>
        </footer>
      </article>`
    })
    .join('');
    //when element is clicked it will originally get the shopping cart icon
    element.addEventListener('click', function(e){
        //this gets the parent element for the icon which is product-cart-btn
        const parent = e.target.parentElement;
        //if this element contains product-cart-btn
        if(parent.classList.contains('product-cart-btn')){
            // add product with id 
            addToCart(parent.dataset.id);
        }
    });
};

export default display;
