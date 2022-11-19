/*--------------CHANGE TAGS---------------*/
let search = "vegetarian, gluten-free";

/*------------GET A NEW RECIPE------------*/

const recipeButton = document.getElementById("recipe-button");

recipeButton.addEventListener("click", function () {
  getRecipe();
});

async function getRecipe() {
  const res = await fetch(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=acb1e2c1f901409fa0d4edc5395a11c0&number=1&maxReadyTime=20&addRecipeInformation=true&sort=random&query=${search}`
  );
  res.json().then(function (res) {
    recipe = res.results;
    console.log(recipe);
    console.log(recipe[0].title);
  });
}

/*-----------DISPLAY THE RECIPE-----------*/
