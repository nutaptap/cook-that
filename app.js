/*-------------CHANGE FILTERS-------------*/
const buttons = document.getElementsByClassName("filters");
let diet = "";

for (i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", function () {
    changeFilters(this.innerHTML);
    makeActive(this.innerHTML);
  });
}

function changeFilters(filter) {
  term = filter.toLowerCase();
  diet = term;
  console.log(diet);
}

function makeActive(selected) {
  for (i = 0; i < buttons.length; i++) {
    if (buttons[i].innerHTML === selected) {
      if (buttons[i].classList.contains("active")) {
        buttons[i].className = "filters";
      } else {
        buttons[i].className += " active";
      }
    }
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
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=32919dc2eb944e8482f7ed12fedfad71&number=1&maxReadyTime=30&addRecipeInformation=true&sort=popular&diet=${diet}&offset=${offset}`
  );
  res.json().then(function (res) {
    console.log(res);
    recipe = res.results;
    console.log(recipe);
    console.log(recipe[0].title);
  });
}

/*-----------DISPLAY THE RECIPE-----------*/
