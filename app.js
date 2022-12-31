const recipeCard = document.getElementById("recipe-card");
/* recipeCard.classList.add("invisible"); */

/*-------------CHANGE FILTERS-------------*/

const filters = document.getElementById("filters");
let recipeData = {};
let filterString = "";

filters.addEventListener("change", function () {
  changeFilter(this.value);
});

function changeFilter(selection) {
  type = "";
  filterString = selection;
}

/*------------GET A NEW RECIPE------------*/

const recipeButton = document.getElementById("recipe-button");
let offset = 0;

recipeButton.addEventListener("click", function () {
  getOffset();
  getRecipe();
});

function getOffset() {
  offset = Math.floor(Math.random() * 60);
}

async function getRecipe() {
  const res = await fetch(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=1cc62e8cd6f84ab3ba211ed0bb158210&number=1&maxReadyTime=30&addRecipeInformation=true&sort=popular&addRecipeNutrition=true&diet=${filterString}&offset=${offset}`
  );
  res.json().then(function (res) {
    console.log(res);
    recipe = res.results;
    updateTitle(recipe[0].title);
    updateImage(recipe[0].image);
    updateInstructions(recipe[0].analyzedInstructions[0].steps);
    updateNutrition(recipe[0].nutrition);
    updateTime(recipe[0].readyInMinutes);
    updateTag();
    getIngredients(recipe[0].id);
  });
  /* recipeCard.classList.remove("invisible"); */
}

async function getIngredients(id) {
  const res = await fetch(
    `https://api.spoonacular.com/recipes/${id}/information?apiKey=918aa9352c7f4a8c890ce6775ff91479&includeNutrition=false`
  );
  res.json().then(function (res) {
    updateIngredients(res.extendedIngredients);
  });
}

/*-----------DISPLAY THE RECIPE-----------*/

const title = document.getElementById("title-display");
const ingredients = document.getElementById("ingredients-display");
const instructions = document.getElementById("instructions-display");
const image = document.getElementById("recipe-image");
const tag = document.getElementById("recipe-tag");
const calories = document.getElementById("calories");
const protein = document.getElementById("protein");
const carbs = document.getElementById("carbs");
const fats = document.getElementById("fats");
const fiber = document.getElementById("fiber");
const time = document.getElementById("time");

function updateTitle(recipeTitle) {
  title.innerText = recipeTitle;
}

function updateImage(recipeImage) {
  image.src = recipeImage;
}

function updateNutrition(nutrition) {
  calories.innerText = nutrition.nutrients[0].amount;
  protein.innerText = `${nutrition.nutrients[8].amount} ${nutrition.nutrients[8].unit}`;
  carbs.innerText = `${nutrition.nutrients[3].amount} ${nutrition.nutrients[3].unit}`;
  fats.innerText = `${nutrition.nutrients[1].amount} ${nutrition.nutrients[1].unit}`;
  fiber.innerText = nutrition.nutrients[14].amount;
}

function updateTime(minutes) {
  time.innerText = `${minutes}m`;
}

function updateTag() {
  if (filterString === "") {
    tag.innerText = "all";
  } else {
    tag.innerText = filterString;
  }
}

function updateInstructions(recipeData) {
  instructions.innerHTML = "";

  const newList = new DocumentFragment();

  for (i = 0; i < recipeData.length; i++) {
    let li = document.createElement("li");
    li.innerText = recipeData[i].step;
    newList.appendChild(li);
  }

  instructions.appendChild(newList);
}

function updateIngredients(recipeData) {
  ingredients.innerHTML = "";

  let ingredientsList = [];
  for (i = 0; i < recipeData.length; i++) {
    ingredientsList.push(recipeData[i].original);
  }

  const newList = new DocumentFragment();

  for (i = 0; i < ingredientsList.length; i++) {
    let li = document.createElement("li");
    li.innerText = ingredientsList[i];
    newList.appendChild(li);
  }

  ingredients.appendChild(newList);
}
