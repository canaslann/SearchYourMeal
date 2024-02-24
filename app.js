// ---navbar---

function scrollToSection(sectionId) {
  var section = document.getElementById(sectionId);
  section.scrollIntoView({ behavior: "smooth" });
}

// Responsive Navbar

const menuicon = document.querySelector("#bar");
const crossicon = document.querySelector("#cross");

menuicon.addEventListener("click", openMenu);
crossicon.addEventListener("click", closeMenu);

function openMenu() {
  var x = document.querySelector(".nav");
  if (x.className === "nav") {
    x.className += "-responsive";
  } else {
    x.className = "nav";
  }
}

function closeMenu() {
  var x = document.querySelector(".nav-responsive");
  if (x && x.className === "nav-responsive") {
    x.className = "nav";
  } else {
    console.log("Menü zaten kapalı veya bulunamadı");
  }
}

// Request for Meals

const searchbutton = document.querySelector(".search-button");
searchbutton.addEventListener("click", check);

function check() {
  const inputValue = document.querySelector(".input").value; // setting input's value to "inputValue"
  saveData(inputValue);
}

async function saveData(inputvalue) {
  if (inputvalue !== "") {
    console.log("succsesfuly saved"); // checked
    sessionStorage.setItem("searchvalue", inputvalue);
  } else {
    console.log("input can not be empty");
  } // setting to session storage
}
