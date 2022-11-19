/*--------------CHANGE TAGS---------------*/
let search = "vegetarian, gluten-free";

/*------------GET A NEW RECIPE------------*/

const recipeButton = document.getElementById("recipe-button");
let offset = 0;

recipeButton.addEventListener("click", function () {
  getOffset();
  getRecipe();
});

function getOffset() {
  offset = Math.floor(Math.random() * 50);
}

async function getRecipe() {
  const res = await fetch(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=32919dc2eb944e8482f7ed12fedfad71&number=1&maxReadyTime=20&addRecipeInformation=true&sort=popular&query=${search}&offset=${offset}`
  );
  res.json().then(function (res) {
    console.log(res);
    recipe = res.results;
    console.log(recipe);
    console.log(recipe[0].title);
  });
}

/*-----------DISPLAY THE RECIPE-----------*/
