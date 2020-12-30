const allProductsUrl = 'https://course-api.com/javascript-store-products'
// temporary single product
// 'https://course-api.com/javascript-store-single-product?id=rec43w3ipXvP28vog'
const singleProductUrl = 'https://course-api.com/javascript-store-single-product'

const getElement = (selection) => {
  //querySelect returns the first element within the document that matches the specified selector or group of selectors
  const element = document.querySelector(selection)
  if (element) return element
  throw new Error(`Please check "${selection}" selector, no such element exist`)
}

//proper way to format a price.
// can also do price / 100
const formatPrice = (price) => {
  let formattedPrice = new Intl.NumberFormat('en-US',{
    //currency style so it will have a $ sign
    style:'currency',
    //US currency
    currency:"USD",
    // divides price by 100 and fixes it to 2 decimal places
  }).format((price / 100).toFixed(2));
  //returns formatted price
  return formattedPrice;
}

//get storage item from local storage in documents
const getStorageItem = (item) => {
  let storageItem = localStorage.getItem(item);
  if(storageItem){
    storageItem = JSON.parse(localStorage.getItem(item));
  } else {
  storageItem = [];
  }
  return storageItem;
}

//set storage item
const setStorageItem = (name, item) => {
  //local storage stores data in the Document 
  //stringify converts a JavaScript object or value to a JSON string
  localStorage.setItem(name,JSON.stringify(item));
}

//export items that can be used outside of module
export {
  allProductsUrl,
  singleProductUrl,
  getElement,
  formatPrice,
  getStorageItem,
  setStorageItem,
}
