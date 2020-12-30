// global imports
import '../toggleSidebar.js';
import '../cart/toggleCart.js';
import '../cart/setupCart.js';

//  filter imports
import setupSearch from '../filters/search.js';
import setupCompanies from '../filters/companies.js';
import setupPrice from '../filters/price.js';

// specific imports
import { store } from '../store.js';
import display from '../displayProducts.js';
import { getElement } from '../utils.js';

const loading = getElement('.page-loading');

//gets all the elements in the store
display(store, getElement('.products-container'));

//setup product search
setupSearch(store);

//setup company search
setupCompanies(store);

setupPrice(store);

//once we get our data then set display to none
loading.style.display = 'none';
