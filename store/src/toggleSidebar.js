//toggleSidebar module
import { getElement } from './utils.js';

//get menu button in DOM
const toggleNav = getElement('.toggle-nav');
//entire side bar menu in DOM
const sidebarOverlay = getElement('.sidebar-overlay');
// X close button in DOM
const closeBtn = getElement('.sidebar-close');

//event listener with click parameter and function
toggleNav.addEventListener('click', ()=>{
    sidebarOverlay.classList.add('show');
});

closeBtn.addEventListener('click', ()=>{
    sidebarOverlay.classList.remove('show');
});