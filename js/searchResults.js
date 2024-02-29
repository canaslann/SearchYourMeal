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

function closeMenu() {
  var x = document.querySelector(".nav-responsive");
  if (x && x.className === "nav-responsive") {
    x.className = "nav";
  } else {
    console.log("Menü zaten kapalı veya bulunamadı");
  }
}

// Requests

const inputvalue = sessionStorage.getItem("searchvalue");
console.log(inputvalue);
window.addEventListener("load", () => getData(inputvalue));

async function getData(inputValue) {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`,
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    data.meals.forEach((meal) => {
      console.log(meal);
      renderSearchResults(meal);
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Render Results

const container = document.querySelector(".results-container");

function renderSearchResults(meals) {
  meals.forEach((meal) => {
    const mealDiv = document.createElement("div");
    mealDiv.classList.add("meal-container");

    renderIngredients(mealDiv, meal);
    renderRecipes(mealDiv, meal);

    container.appendChild(mealDiv);
  });
}

function renderSearchResults(meal) {
  renderIngredients(meal);
  renderRecipes(meal);
}

function renderIngredients(mealData) {
  const containerLeft = document.querySelector(".container-left");

  // Extract ingredients from mealData
  const ingredients = [];
  for (let i = 1; i <= 11; i++) {
    const ingredient = mealData[`strIngredient${i}`];
    if (ingredient) {
      ingredients.push(ingredient);
    }
  }

  // Render HTML dynamically
  containerLeft.innerHTML = `
    <div class="random-image">
      <img src="${
        mealData.strMealThumb
      }" alt="a Reuben sandwich on wax paper" />
    </div>
    <h2 class="container-left-title">Ingredients</h2>
    <div class="ingredients">
      <ul>
        ${ingredients.map((ingredient) => `<li>${ingredient}</li>`).join("")}
      </ul>
   
  `;
}

function renderRecipes(mealdata) {
  const containerRight = document.querySelector(".container-right");

  var videoURL = `${mealdata.strYoutube}`;
  var splited = videoURL.split("v=");
  var splitedAgain = splited[1].split("&");
  var videoId = splitedAgain[0];

  containerRight.innerHTML =
    containerRight.innerHTML = `<div class="text-container">
              <h2  class="right-title">${mealdata.strMeal}</h2>
              <div class="recipe">
                <h5>Recipe:</h5>

                ${mealdata.strInstructions}
                <h5>Category:</h5>
                <p>${mealdata.strCategory}</p>
<div>
  <iframe frameborder="0"  width="100%" 
    src="https://youtube.com/embed/${videoId}?autoplay=1&controls=0&showinfo=0&autohide=1">
  </iframe>
</div>
               
              </div>
            </div> `;
}
