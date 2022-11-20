/*-------------CHANGE FILTERS-------------*/
const buttons = document.getElementsByClassName("diet");
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
  for (i = 0; i < buttons.length; i++) {
    buttons[i].className = "diet";
  }
  console.log(dietArray, dietString);
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
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=32919dc2eb944e8482f7ed12fedfad71&number=1&maxReadyTime=30&addRecipeInformation=true&sort=popular&diet=${dietString}&offset=${offset}`
  );
  res.json().then(function (res) {
    console.log(res);
    recipe = res.results;
    console.log(recipe);
    console.log(recipe[0].title);
  });
}

/*-----------DISPLAY THE RECIPE-----------*/
