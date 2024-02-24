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

    console.log("Meals:");
    data.meals.forEach((meal) => {
      console.log(meal);
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
