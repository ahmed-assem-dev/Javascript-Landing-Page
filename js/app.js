let navBar = document.querySelector("nav ul");
let sections = document.querySelectorAll("section");
let secDivs = document.querySelectorAll(".secDiv");
let toggleBtn = document.querySelector("#toggleBtn");
let navUl = document.querySelector(".navUl");
let newFrag = document.createDocumentFragment(); //a fragment to create an off-screen DOM tree
//Checking if the section is on top of viewport
function checkVisibility(element) {
  let elementY = element.offsetTop;
  let y = window.pageYOffset;

  let isInTopViewPort = elementY <= y;
  let isInBottomViewPort = y <= elementY + 200;
  return isInTopViewPort && isInBottomViewPort;
}
//Creates the floating left and right sections if screen size less than 600
function secMargin() {
  for (let i = 1; i <= sections.length; i++) {
    if (window.innerWidth >= 600) {
      if (i % 2 == 0) {
        sections[i - 1].style.cssText = "margin-right: 40px";
      } else {
        sections[i - 1].style.cssText = "margin-left: 40px";
      }
    }
  }
}

for (let i = 1; i <= sections.length; i++) {
  let newSection = document.createElement("a"); //creates sections' nav anchors
  let secHeading = document.createElement("h2"); //creates Sections' headings

  //Adding text to headings
  secHeading.innerHTML = "section " + i;
  //Adding the html to nav anchors
  newSection.innerHTML = `<li> Section ${i} </li>`;
  //Smoothly navigating to each section
  newSection.addEventListener(`click`, (e) => {
    e.preventDefault;
    sections[i - 1].scrollIntoView({
      behavior: "smooth",
    });
  });
  //setting the sections' ids for targeting
  sections[i - 1].setAttribute("id", `section${i}`);
  //appending it to the fragment
  newFrag.append(newSection);
  //prepending the heading before each section
  sections[i - 1].prepend(secHeading);
  secMargin();
  //centers sections when screen is resized below 600
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 600) {
      secMargin();
    } else {
      sections[i - 1].style.cssText = "";
    }
  });
}
navBar.append(newFrag); //appending the fragment to navBar

//changing style for active element and its anchor in navbar
document.addEventListener("scroll", () => {
  let listItem = document.querySelectorAll("li");
  let heading = document.querySelectorAll("h2");

  for (let i = 1; i <= sections.length; i++) {
    if (checkVisibility(secDivs[i - 1])) {
      if (heading[i - 1].style.color != "#CED2C2") {
        heading[i - 1].style.cssText =
          "text-decoration: underline; color: CED2C2";
        listItem[i - 1].style.backgroundColor = "#CED2C2";
      }
    } else if (!checkVisibility(secDivs[i - 1])) {
      if ((heading[i - 1].style.color = "#CED2C2")) {
        heading[i - 1].style.cssText = "color: black";
        listItem[i - 1].style.backgroundColor = "inherit";
      }
    }
  }
});
//Toggling the menu on small sized screens
toggleBtn.addEventListener("click", () => {
  console.log("clicked");
  navUl.classList.toggle("displayed");
  if (toggleBtn.innerHTML == `X`) {
    toggleBtn.innerHTML = ">";
  } else {
    toggleBtn.innerHTML = `X`;
  }
});
//Back to top button
let backToTop = document.querySelector(`#backToTop`);
backToTop.addEventListener("click", (e) => {
  e.preventDefault;
  sections[0].scrollIntoView({
    behavior: "smooth",
  });
});
