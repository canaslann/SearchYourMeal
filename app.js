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
const searchbuttonlink = document.querySelector(".search-link");
searchbutton.addEventListener("click", check);

function check() {
  const inputValue = document.querySelector(".input").value; // input değerini "inputValue" olarak ayarla
  if (inputValue == "") {
    // Search Bar bos sekilde yonlendirilmesin Kontrolu
    alert("!!!");
  } else {
    searchbuttonlink.href = "searchResults.html";
    saveData(inputValue);
  }
}

async function saveData(inputValue) {
  console.log(inputValue);
  console.log("successfully saved"); // başarılı bir şekilde kaydedildi
  sessionStorage.setItem("searchvalue", inputValue);
  // session storage'a ayarla
}

// Random Recipe Codes

const randomButton = document.querySelector(".random-button"); // Random butonunu htmlden yakaladik
randomButton.addEventListener("click", runEventListener);

function runEventListener() {
  console.log("succesfuly");
  giveRandomRecipe();
}

async function giveRandomRecipe() {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/random.php`,
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    data.meals.forEach((meal) => {
      const randomMealData = meal;
      renderMealData(randomMealData);
      console.log(randomMealData);
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function renderMealData(mealData) {
  console.log(mealData.strInstructions.length);
  for (let show = false; show <= true; show++) {
    giveRandomRecipe;
    if (mealData.strInstructions.length >= 600) {
      show = true;
      const containerRight = document.querySelector(".container-right");
      const containerLeft = document.querySelector(".container-left");

      containerLeft.innerHTML = `<div class="ingredients">
              <div class="dot-spinner-cover-left">
                <div class="dot-spinner">
                  <div class="dot-spinner__dot"></div>
                  <div class="dot-spinner__dot"></div>
                  <div class="dot-spinner__dot"></div>
                  <div class="dot-spinner__dot"></div>
                  <div class="dot-spinner__dot"></div>
                  <div class="dot-spinner__dot"></div>
                  <div class="dot-spinner__dot"></div>
                  <div class="dot-spinner__dot"></div>
                </div>
              </div>
            </div>`;

      containerRight.innerHTML = `<div class="container-right">
            <div class="text-container">
              <h2 class="right-title">Recipe Name</h2>
              <div class="dot-spinner-cover-right">
                <div class="dot-spinner">
                  <div class="dot-spinner__dot"></div>
                  <div class="dot-spinner__dot"></div>
                  <div class="dot-spinner__dot"></div>
                  <div class="dot-spinner__dot"></div>
                  <div class="dot-spinner__dot"></div>
                  <div class="dot-spinner__dot"></div>
                  <div class="dot-spinner__dot"></div>
                  <div class="dot-spinner__dot"></div>
                </div>
              </div>
            </div>
          </div>`;
      giveRandomRecipe();
    } else {
      renderIngredients(mealData);
      renderRecipes(mealData);
    }
  }
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
    </div>
  `;
}
function renderRecipes(mealdata) {
  const containerRight = document.querySelector(".container-right");

  containerRight.innerHTML = `<div class="text-container">
              <h2 class="right-title">${mealdata.strMeal}</h2>
              <div class="recipe">
                <h5>Recipe:</h5>

                ${mealdata.strInstructions}
                <h5>Category:</h5>
                <p>${mealdata.strCategory}</p>
                <div class="video-btn">
                  <a href="https://www.youtube.com" target="_blank"
                    ><button class="comic-button">
                      <i class="fa-brands fa-youtube"></i>
                      <b>Make With Video</b>
                    </button></a
                  >
                </div>
              </div>
            </div> `;
}
