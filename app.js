async function getData() {
  const url = "https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata";
  const options = {
    method: "GET",
    headers: {
      "Access-Control-Allow-Headers": "1",
    },
  };

  const keyword = "pizza";

  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${keyword}`)
    .then((response) => response.json())
    .then((data) => console.log(data.title))
    .catch((err) => console.error(err));
}

getData();
