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

// Scroll To Top

const goTopBtn = document.querySelector(".go-top-btn");

window.addEventListener("scroll", checkHeight);

function checkHeight() {
  if (window.scrollY > 200) {
    goTopBtn.style.display = "flex";
  } else {
    goTopBtn.style.display = "none";
  }
}

goTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
