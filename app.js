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
  for (i = 0; i < buttons.length; i++) {
    buttons[i].className = "diet";
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
  offset = Math.floor(Math.random() * 20);
}

async function getRecipe() {
  const res = await fetch(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=ece8e30cf5ca42b1b4c2b09e2807443f&number=1&maxReadyTime=30&addRecipeInformation=true&sort=popular&diet=${dietString}&offset=${offset}`
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
/* const r = document.querySelector(":root"); */
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

/* function updateIngredients(recipeData) {
  ingredients.innerHTML = "";

  let objectsList = [];
  for (i = 0; i < recipeData.length; i++) {
    objectsList.push(recipeData[i].ingredients);
  }

  let ingredientsList = [];
  for (i = 0; i < objectsList.length; i++) {
    if (objectsList[i].length > 0) {
      for (j = 0; j < objectsList[i].length; j++)
        ingredientsList.push(objectsList[i][j].name);
    }
  }

  const newList = document.createElement("ul");

  for (i = 0; i < ingredientsList.length; i++) {
    let li = document.createElement("li");
    li.innerText =
      ingredientsList[i].charAt(0).toUpperCase() + ingredientsList[i].slice(1);
    newList.appendChild(li);
  }

  ingredients.appendChild(newList);
} */
