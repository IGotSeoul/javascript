// import
import {
  getStorageItem,
  setStorageItem,
  formatPrice,
  getElement,
} from '../utils.js';
import { openCart } from './toggleCart.js';
import { findProduct } from '../store.js';
import addToCartDOM from './addToCartDOM.js';
// set items

const cartItemCountDOM = getElement('.cart-item-count');
const cartItemsDOM = getElement('.cart-items');
const cartTotalDOM = getElement('.cart-total');

//empty / not in local storage yet
let cart = getStorageItem('cart');

export const addToCart = (id) => {
  //items in cart and checks if it matches any items by id
  let item = cart.find( (cartItem) => cartItem.id === id);
  //if item is not in cart
  if(!item){
    let product = findProduct(id);
    //add item to cart
    product = {...product, amount:1};
    //... = get all items in cart and add product
    cart = [...cart, product];
    //add item to DOM
    addToCartDOM(product);
  //if item is already in cart
  }else{
    //update values
    const amount = increaseAmount(id);
    //selecting all cart item amounts into a nodelist and turns into array using spread operator
    const items = [...cartItemsDOM.querySelectorAll('.cart-item-amount')];
    //find new value from array and assign to new amount
    const newAmount = items.find((value)=>value.dataset.id === id);
    newAmount.textContent = amount;
  }
  //add one to the item count
  displayCartItemCount();
  //display cart totals
  displayCartTotal();
  //set cart in local storage
  setStorageItem('cart', cart);
  //invokes open cart
  openCart();
};

//updating count
function displayCartItemCount() {
  const amount = cart.reduce((total, cartItem)=>{
    //adds each cart item amount to total
     return (total += cartItem.amount);
  }, 0);

  cartItemCountDOM.textContent = amount;
}

//updating total in DOM
function displayCartTotal () {
  let total = cart.reduce((total, cartItem) => {
    return total += cartItem.price * cartItem.amount;
  },0);
  //updates cart total in DOM
  cartTotalDOM.textContent = `Total : ${formatPrice(total)}`;
}

//keeps the cart items in DOM from page to page
function displayCartItemsDOM () {
  //iterates through cart and adds item to cart DOM
  cart.forEach( (cartItem) => {
    addToCartDOM(cartItem);
  });
}

//remove item from cart
function removeItem(id){
  //if cart item ID does not match current id update cart
  cart = cart.filter((cartItem)=> cartItem.id !== id);
}

//increase amount of cart items
function increaseAmount(id){
  //new amount for cart item
  let newAmount;
  cart = cart.map( (cartItem) => {
    if(cartItem.id === id){
      newAmount = cartItem.amount + 1;
      //takes all existing cart properties and add 1 to amount
      cartItem = { ...cartItem, amount: newAmount };
    }
    //if item is not in cart return cart item as is
    return cartItem;
  });
  return newAmount;
}

//increase amount of cart items
function decreaseAmount(id){
  //new amount for cart item
  let newAmount;
  cart = cart.map((cartItem)=>{
    if(cartItem.id === id){
      newAmount = cartItem.amount - 1;
      //takes all existing cart properties and add 1 to amount
      cartItem = {...cartItem, amount: newAmount};
    }
    //if item is not in cart return cart item as is
    return cartItem;
  });
  return newAmount;
}

function setupCartFunctionality(){
  cartItemsDOM.addEventListener('click', function(e){
    const element = e.target;
    //button
    const parent = e.target.parentElement;
    //id of element
    const id = e.target.dataset.id;
    //id of parent
    const parentID = e.target.parentElement.dataset.id;
    //remove item from cart
    if(element.classList.contains('cart-item-remove-btn')){
      removeItem(id);
      //removes from DOM
      parent.parentElement.remove();
      // element.parentElement.parentElement.remove();
    }
    //increase
    if(parent.classList.contains('cart-item-increase-btn')){
      //update amount of items
      const newAmount = increaseAmount(parentID);
      //update DOM
      parent.nextElementSibling.textContent = newAmount;
    }
    //decrease
    if(parent.classList.contains('cart-item-decrease-btn')){
      //update amount of items
      const newAmount = decreaseAmount(parentID);
      if(newAmount === 0){
      removeItem(parentID)
      parent.parentElement.parentElement.remove()
      }
      else{
        parent.previousElementSibling.textContent = newAmount;
      }
    }

    displayCartItemCount();
    displayCartTotal();
    setStorageItem('cart', cart);
  });
}

//each page you are invoking init
const init = () => {
  //display amount of cart item
  displayCartItemCount();
  //display cart total
  displayCartTotal();
  //add all cart items to the DOM
  displayCartItemsDOM();
  // setup cart functionality
  setupCartFunctionality();
}
init();