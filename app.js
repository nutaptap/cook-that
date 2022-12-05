/*-------------CHANGE FILTERS-------------*/
const buttons = document.getElementsByClassName("diet");
let recipeData = {};
let dietArray = [];
let dietString = "";

for (i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", function () {
    changeDiet(this.innerHTML);
    makeActive(this.innerHTML);
  });
}

function changeDiet(selection) {
  diet = selection.toLowerCase();

  if (dietArray.includes(diet)) {
    const index = dietArray.indexOf(diet);
    dietArray.splice(index, 1);
  } else {
    dietArray.push(diet);
  }

  dietString = dietArray.toString();
  console.log(dietArray, dietString);
}

function makeActive(selected) {
  isAll = false;
  allButton.className = "";
  for (i = 0; i < buttons.length; i++) {
    if (buttons[i].innerHTML === selected) {
      if (buttons[i].classList.contains("active")) {
        buttons[i].className = "diet";
      } else {
        buttons[i].className += " active";
      }
    }
  }
}

/*---------------ALL BUTTON---------------*/
const allButton = document.getElementById("All");
let isAll = true;
allButton.className = "active";

allButton.addEventListener("click", function () {
  changeAll();
});

function changeAll() {
  isAll = true;
  allButton.className = "active";
  dietArray = [];
  dietString = "";
  type = "";
  for (i = 0; i < buttons.length; i++) {
    buttons[i].className = "diet";
  }
  dessertsButton.className = "";
  console.log(dietArray, dietString);
}

/*------------DESSERTS BUTTON-------------*/
const dessertsButton = document.getElementById("desserts");
let type = "";

dessertsButton.addEventListener("click", function () {
  if (type === "") {
    type = "dessert";
    dessertsButton.className = "active";
  } else {
    type = "";
    dessertsButton.className = "";
  }
  console.log(type);
});

/*------------GET A NEW RECIPE------------*/

const recipeButton = document.getElementById("recipe-button");
let offset = 0;

recipeButton.addEventListener("click", function () {
  getOffset();
  getRecipe();
});

function getOffset() {
  offset = Math.floor(Math.random() * 20);
}

async function getRecipe() {
  const res = await fetch(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=32919dc2eb944e8482f7ed12fedfad71&number=1&maxReadyTime=30&addRecipeInformation=true&sort=popular&diet=${dietString}&offset=${offset}&type=${type}`
  );
  res.json().then(function (res) {
    recipe = res.results;
    updateTitle(recipe[0].title);
    updateImage(recipe[0].image);
    updateIngredients(recipe[0].analyzedInstructions[0].steps);
    updateInstructions(recipe[0].analyzedInstructions[0].steps);
  });
}

/*-----------DISPLAY THE RECIPE-----------*/
const r = document.querySelector(":root");
const title = document.getElementById("title-display");
const ingredients = document.getElementById("ingredients-display");
const instructions = document.getElementById("instructions-display");

function updateTitle(recipeTitle) {
  title.innerText = recipeTitle;
}

function updateIngredients(recipeData) {
  let ingredients = "";

  console.log(recipeData);
}

function updateInstructions(recipeData) {
  let recipeInstructions = "";
  for (i = 0; i < recipeData.length; i++) {
    recipeInstructions += recipeData[i].step;
  }
  instructions.innerText = recipeInstructions;
}

function updateImage(recipeImage) {}
