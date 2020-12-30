import { getElement } from '../utils.js';
import display from '../displayProducts.js';

const setupCompanies = (store) => {
    // display all product's companies in an object
    // input into array
    // SET gets back all UNIQUE values
    let companies = ['all',...new Set (store.map((product) => product.company))];
    //DOM
    const companiesDOM = getElement('.companies');
    companiesDOM.innerHTML = companies
        .map( (company) => {
            return `<button class="company-btn">${company}</button>`;
        })
        .join('');
    //set up event listener on the companies to check which button was clicked on
    companiesDOM.addEventListener('click',function(e){
        //element = button company that is clicked on
        const element = e.target;
        //if any of the elements on the class contain company-btn
        if(element.classList.contains('company-btn')){
                //newStore array
                let newStore = [];
                //if element contains all text
            if (element.textContent === 'all'){
                //display whole store
                newStore = [...store];
            } else {
                //filter store to companies that contain clicked element
                newStore = store.filter( (product) => product.company === e.target.textContent);
            }
            //display whole store if nothing is clicked
            display(newStore,getElement('.products-container'));
        }
    });
};

export default setupCompanies;
