const recipeCard = document.getElementById("recipe-card");
recipeCard.classList.add("invisible");

/*-------------CHANGE FILTERS-------------*/

const filters = document.getElementById("filters");
let recipeData = {};
let filterString = "";
let type = "";

filters.addEventListener("change", function () {
  changeFilter(this.value);
});

function changeFilter(selection) {
  if (selection === "dessert") {
    type = "dessert";
  } else {
    type = "";
    filterString = selection;
  }
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
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=1cc62e8cd6f84ab3ba211ed0bb158210&number=1&maxReadyTime=30&addRecipeInformation=true&sort=popular&diet=${filterString}&type=${type}&offset=${offset}`
  );
  res.json().then(function (res) {
    recipe = res.results;
    updateTitle(recipe[0].title);
    updateImage(recipe[0].image);
    updateInstructions(recipe[0].analyzedInstructions[0].steps);
    getIngredients(recipe[0].id);
  });
  recipeCard.classList.remove("invisible");
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

function updateTitle(recipeTitle) {
  title.innerText = recipeTitle;
}

function updateImage(recipeImage) {
  image.src = recipeImage;
}

function updateInstructions(recipeData) {
  instructions.innerHTML = "";

  const newList = document.createElement("ol");

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

  const newList = document.createElement("ul");

  for (i = 0; i < ingredientsList.length; i++) {
    let li = document.createElement("li");
    li.innerText = ingredientsList[i];
    newList.appendChild(li);
  }

  ingredients.appendChild(newList);
}
