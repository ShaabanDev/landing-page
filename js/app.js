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
let sections = Array.from(document.querySelectorAll("section"));
let sectionContent = document.querySelectorAll("p");
let openSec = true;
const naveList = document.querySelector("#navbar__list");
const mainElement = document.querySelector("main");
const topHeader = document.getElementById("topHeader");
let isScrolling = null;
let links;
let counter = sections.length + 1;
const upButton = document.querySelector(".up");

/**
 * End Global Variables
 * Start Helper Functions
 *
 */

// create the section dom
const createSectionDom = (num) => {
  const divElement = document.createElement("div");
  const secElement = document.createElement("section");
  const buttElement = document.createElement("button");
  buttElement.className = "sectionButton";
  buttElement.textContent = "Close Section";
  secElement.id = `section${num}`;
  const h2Element = document.createElement("h2");
  h2Element.textContent = `Section ${num}`;
  h2Element.appendChild(buttElement);
  const p1Element = document.createElement("p");
  p1Element.textContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus pharetra dapibus. Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget lacinia ex. Phasellus imperdiet porta orci eget mollis. Sed convallis sollicitudin mauris ac tincidunt. Donec bibendum, nulla eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam nunc eu augue. Pellentesque maximus imperdiet elit a pharetra. Duis lectus mi, aliquam in mi quis, aliquam porttitor lacus. Morbi a tincidunt felis. Sed leo nunc, pharetra et elementum non, faucibus vitae elit. Integer nec libero venenatis libero ultricies molestie semper in tellus. Sed congue et odio sed euismod.";
  const p2Element = document.createElement("p");
  p2Element.textContent =
    "Aliquam a convallis justo. Vivamus venenatis, erat eget pulvinar gravida, ipsum lacus aliquet velit, vel luctus diam ipsum a diam. Cras eu tincidunt arcu, vitae rhoncus purus. Vestibulum fermentum consectetur porttitor. Suspendisse imperdiet porttitor tortor, eget elementum tortor mollis non.";
  divElement.className = "landing__container";
  divElement.append(h2Element, p1Element, p2Element);
  secElement.appendChild(divElement);
  return secElement;
};
// create the li dom
const createLiDom = (index) => {
  const liElement = document.createElement("li");
  const aElement = document.createElement("a");
  aElement.className = "menu__link";
  aElement.textContent = `Section${index + 1}`;
  liElement.appendChild(aElement);
  return liElement;
};

const onViewPort = (sec) => {
  const secOffset = Math.floor(sec.getBoundingClientRect().top);
  return secOffset < 200 && secOffset >= -200;
};

const scrollEnd = (window) => {
  return window.innerHeight + window.scrollY >= document.body.offsetHeight;
};
/**
 * End Helper Functions
 * Begin Main Functions
 *
 */
// add new section
const addSection = (num) => {
  mainElement.appendChild(createSectionDom(num));
};
// build the nav
const buildTheNav = () => {
  sections.forEach((element, index) => {
    naveList.appendChild(createLiDom(index));
  });
  links = document.querySelectorAll(".menu__link");
};

// Add class 'active' to section when near top of viewport
const makeActiveClass = () => {
  window.addEventListener("scroll", (e) => {
    const sections = Array.from(document.querySelectorAll("section"));
    sections.forEach((sec, index) => {
      if (onViewPort(sec)) {
        links[index].id = "active-link";
        sec.classList.add("your-active-class");
      } else {
        sec.classList.remove("your-active-class");
        links[index].id = "";
      }
    });
  });
};

// Scroll to anchor ID using scrollTO event
const scrollToSection = () => {
  links.forEach((link, index) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const domHeight =
        sections[index].getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: domHeight,
        behavior: "smooth",
      });
    });
  });
};

/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu
buildTheNav();
// Scroll to section on link click
scrollToSection();
// Set sections as active
makeActiveClass();

// add new section
document.querySelector("#secButton").addEventListener("click", () => {
  addSection(counter);
  counter++;
  sections = Array.from(document.querySelectorAll("section"));
  document.querySelector("#navbar__list").innerHTML = "";
  buildTheNav();
  scrollToSection();
});


// Hide fixed navigation bar while not scrolling 
// && Add a scroll to top button on the page that’s only visible when the user scrolls below the fold of the page.
window.addEventListener("scroll", () => {
  scrollEnd(window)
    ? upButton.classList.add("show")
    : upButton.classList.remove("show");
  //this.scrollY===0?topHeader.style.top='0px':null
  window.clearTimeout(isScrolling);
  // Set a timeout to run after scrolling ends
  isScrolling != null ? (topHeader.style.top = "0px") : null;
  isScrolling = setTimeout(function () {
    this.scrollY === 0
      ? (topHeader.style.top = "0px")
      : (topHeader.style.top = "-1500px");
  }, 150);
});


// up button event
upButton.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});


// Make sections collapsible.
let buttonList = Array.from(document.getElementsByClassName("sectionButton"));
  buttonList.forEach((button, index) => {
    button.addEventListener("click", () => {
      const pList = Array.from(sections[index].querySelectorAll("p"));
      pList.forEach((element) => {
        if (openSec) {
          element.style.overflow = "hidden";
          element.style.display = "none";
          button.textContent = "Open Section";
        } else {
          element.style.overflow = "";
          element.style.display = "";
          button.textContent = "Close Section";
        }
      });
    openSec = !openSec;
    console.log(sections)
    console.log(pList)
      console.log(openSec,'aaa')
    });
  });
