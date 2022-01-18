/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
const sections = document.querySelectorAll('section');
const ul = document.getElementById('navbar__list');
let navFrag = new DocumentFragment;


/**
 * End Global Variables
 * 
*/


/**
 * Begin Main Functions
 * 
*/

// build the nav
const nav = () => {
    for (let section of sections)
    {
        let list = document.createElement('li');
        let link = document.createElement('a');
        link.classList.add('menu__link');//to add css propreties
        link.href=`#${section.id}`;//add swection's anchor
        link.textContent=`${section.dataset.nav}`;
       
        list.appendChild(link);
        navFrag.appendChild(list); 
    }  
    ul.appendChild(navFrag);
};

// Add class 'active' to section when near top of viewport
let activeSec = (e) => {
    const observer =  new IntersectionObserver ((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting)
            {
                entry.target.classList.add('your-active-class');
            }
            else 
            {
                entry.target.classList.remove('your-active-class');
            }
        })
    }, {threshold: [0.5],});

    observer.observe(e);
}

// Scroll to anchor ID using scrollIntoView event smothly
let scrollfn = (e) => {

    document.querySelector(`${e.getAttribute('href')}`).scrollIntoView({
       block:"center",
       behavior: "smooth",
});    
}

/**
 * End Main Functions
 * Begin Events
 * 
*/

//mZ Build menu 
nav();

// Scroll to section on link click
let links = document.querySelectorAll('a');
links.forEach(link => 
{
  link.addEventListener('click', (e) => {
    e.preventDefault();
    scrollfn(link);
}); 
});

    
// Set sections as active
sections.forEach( section => activeSec(section));
