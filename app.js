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
const toTheTop =document.getElementById('toTop');
const addContent =document.getElementById('addContent');
const nav =document.getElementById('navbar__list');
const main = document.querySelector('main');
const navBarMenu = document.querySelector('.page__header')


//add sections 
let counter=0;
let addSection =() => {
 counter++;
 const paragraph = `<section id="section${counter}" data-nav="Section ${counter}" >
 <div class="landing__container">
   <h2>Section ${counter}</h2>
   <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus pharetra dapibus. Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget lacinia ex. Phasellus imperdiet porta orci eget mollis. Sed convallis sollicitudin mauris ac tincidunt. Donec bibendum, nulla eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam nunc eu augue. Pellentesque maximus imperdiet elit a pharetra. Duis lectus mi, aliquam in mi quis, aliquam porttitor lacus. Morbi a tincidunt felis. Sed leo nunc, pharetra et elementum non, faucibus vitae elit. Integer nec libero venenatis libero ultricies molestie semper in tellus. Sed congue et odio sed euismod.</p>

   <p>Aliquam a convallis justo. Vivamus venenatis, erat eget pulvinar gravida, ipsum lacus aliquet velit, vel luctus diam ipsum a diam. Cras eu tincidunt arcu, vitae rhoncus purus. Vestibulum fermentum consectetur porttitor. Suspendisse imperdiet porttitor tortor, eget elementum tortor mollis non.</p>

</section>`;

main.insertAdjacentHTML("beforeend", paragraph);
};


//add nav items
let addNavItem =() =>
{
    
    nav.innerHTML='';
    document.querySelectorAll("section").forEach((section) =>
     {
    const listSection = `<li><a class="menu__link" href="#${section.id}" data-nav="${section.id}">${section.dataset.nav}</a></li> `;
    nav.insertAdjacentHTML('beforeend',listSection);
    });
}


//adding four sections & navItems
for (let i =0; i<4; ++i)
{
    addSection();
    addNavItem();
};


//to the top button function
document.addEventListener('scroll', function (){

// to make the button appear while scrolling to a specific limit -550-
if (window.scrollY >= '550')
{
    toTheTop.style.display = 'block';

    //to make the button go to the top when is clicked
    toTheTop.addEventListener('click', function () {
        window.scrollTo(0,0);
    });
    
}
// to make the button disappear while scrolling to a limit smaller than 550
else
{
    toTheTop.style.display = 'none';
}
});


// add observertion to the sections
const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
    let activeLink= nav.querySelector(`[data-nav=${entry.target.id}]`)
       if (entry.isIntersecting)
       {
           entry.target.classList.add('your-active-class');
           activeLink.classList.add('active-link');
       }
       else
       {
        entry.target.classList.remove('your-active-class');
        activeLink.classList.remove('active-link');
       }
    })
},{
    threshold:0.8,
});


//to make the func. run every time we added new section
document.addEventListener('scroll', () =>{
    return document.querySelectorAll('section').forEach((section) => {
    observer.observe(section)
})
}); 

// when the page is quiet for 5s the menu (header) will disapear
let scrolling;
document.onscroll = () => {
  navBarMenu.style.display="block";
  clearTimeout(scrolling);
  scrolling = setTimeout(() => {
      navBarMenu.style.display= "none";
  }, 5000);
};