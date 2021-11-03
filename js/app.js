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
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
 */

/**
 * Define Global Variables
 *
 */
 const sections = Array.from(document.querySelectorAll("section"));
 const ulElement = document.querySelector("#navbar__list");
/**
 * End Global Variables
 * Start Helper Functions
 *
 */

// function that creates  the nav bar
 const createNavBar = () => {
    for (let i = 0; i < sections.length; i++) {
      const liElement = document.createElement("li");
      const linkElement = document.createElement("a");
      linkElement.id = `sectionLink${i + 1}`;
      linkElement.className = "menu__link";
      linkElement.textContent = `Section ${i + 1}`;
      liElement.appendChild(linkElement);
      ulElement.appendChild(liElement);
    }
  };
/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav



createNavBar();
const links = Array.from(document.querySelectorAll("a"));


  

// Add class 'active' to section when near top of viewport

// Scroll to anchor ID using scrollTO event
links.forEach((link, index) => {
    
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const domHeight =
        sections[index].getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: domHeight,
        behavior: "smooth",
      });
      console.log(sections[index])
    });
  });
/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu

// Scroll to section on link click

// Set sections as active
