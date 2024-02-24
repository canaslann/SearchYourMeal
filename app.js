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

// fetch api

async function getData() {
  const options = {
    method: "GET",
    headers: {
      "Access-Control-Allow-Headers": "1",
    },
  };

  fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    .then((res) => res.json())
    .then((data) =>
      console.log(
        data.meals.forEach((element) => {
          console.log(element);
        })
      )
    );
}

getData();

// ---navbar---

function scrollToSection(sectionId) {
  var section = document.getElementById(sectionId);
  section.scrollIntoView({ behavior: "smooth" });
}
