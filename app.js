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

// Sayfa Yuklendiginde Yuklenicek Kodlar

window.addEventListener("load", randomRecipeSectionRender);

async function randomRecipeSectionRender() {
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
      callRenderMealDataPage(randomMealData); // render etmeye gonderdik
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function callRenderMealDataPage(mealData) {
  console.log(mealData.strInstructions.length);
  if (mealData.strInstructions.length >= 700) {
    // filtreliyoruz
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
    randomRecipeSectionRender();
  } else {
    callRenderMealDataPageIngredients(mealData);
    callRenderMealDataPageRecipe(mealData);
  }
}

function callRenderMealDataPageIngredients(mealData) {
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

function callRenderMealDataPageRecipe(mealdata) {
  var videoURL = `${mealdata.strYoutube}`;
  var splited = videoURL.split("v=");
  var splitedAgain = splited[1].split("&");
  var videoId = splitedAgain[0];

  console.log(videoId);

  const containerRight = document.querySelector(".container-right");
  console.log(mealdata.strYoutube);
  containerRight.innerHTML = `<div class="text-container">
              <h2 class="right-title">${mealdata.strMeal}</h2>
              <div class="recipe">
                <h5>Recipe:</h5>

                ${mealdata.strInstructions}
                <h5>Category:</h5>
                <p>${mealdata.strCategory}</p>
<div ">
  <iframe frameborder="0" height="200px" width="100%" 
    src="https://youtube.com/embed/${videoId}?autoplay=1&controls=0&showinfo=0&autohide=1">
  </iframe>
</div>
               
              </div>
            </div> `;
}

// Random Butonun Bastiginda Calisicaklar

const randomButton = document.querySelector(".random-button"); // Random butonunu htmlden yakaladik
randomButton.addEventListener("click", runEventListener); // event ekledik

function runEventListener() {
  // main functionu cagirdik
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
      renderMealData(randomMealData); // render etmeye gonderdik
      console.log(randomMealData);
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function renderMealData(mealData) {
  console.log(mealData.strInstructions.length);
  if (mealData.strInstructions.length >= 500) {
    // filtreliyoruz
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

  var videoURL = `${mealdata.strYoutube}`;
  var splited = videoURL.split("v=");
  var splitedAgain = splited[1].split("&");
  var videoId = splitedAgain[0];

  containerRight.innerHTML =
    containerRight.innerHTML = `<div class="text-container">
              <h2 class="right-title">${mealdata.strMeal}</h2>
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
