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
    hideAll();
    updateTitle(recipe[0].title);
    updateImage(recipe[0].image);
    updateInstructions(recipe[0].analyzedInstructions[0].steps);
    updateNutrition(recipe[0].nutrition);
    updateTime(recipe[0].readyInMinutes);
    updateTag();
    getIngredients(recipe[0].id);
    displayRecipe();
  });
}

async function getIngredients(id) {
  const res = await fetch(
    `https://api.spoonacular.com/recipes/${id}/information?apiKey=acb1e2c1f901409fa0d4edc5395a11c0&includeNutrition=false`
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

/*-----------ANIMATIONS-----------*/

const header = document.getElementById("header");

function displayRecipe() {
  setTimeout(function () {
    header.classList.remove("hidden");
  }, 1000);
}

const ingredientsAnimate = document.getElementById("ingredients");
const instructionsAnimate = document.getElementById("instructions");
const aboutAnimate = document.getElementById("about-animate");
const imageAnimate = document.getElementById("image-animate");
const arrowAnimate = document.getElementById("arrow");
const footerAnimate = document.getElementById("footer");

window.addEventListener("scroll", animate);

function animate() {
  const scrollPosition = window.scrollY;
  const targetIngredients = ingredientsAnimate.offsetTop + 25;
  if (scrollPosition > targetIngredients) {
    ingredientsAnimate.classList.remove("hidden");
    instructionsAnimate.classList.remove("hidden");
  }
  const targetAbout = aboutAnimate.offsetTop + 25;
  if (scrollPosition > targetAbout) {
    setTimeout(function () {
      aboutAnimate.classList.remove("hidden");
      imageAnimate.classList.remove("hidden");
    }, 1800);
  }
  const targetArrow = arrowAnimate.offsetTop + 25;
  if (scrollPosition > targetArrow) {
    setTimeout(function () {
      arrowAnimate.classList.remove("hidden");
      footerAnimate.classList.remove("hidden");
    }, 2800);
  }
}

/* window.addEventListener("scroll", animateIngredients);

function animateIngredients() {
  const scrollPosition = window.scrollY;
  const targetIngredients = ingredientsAnimate.offsetTop + 25;
  if (scrollPosition > targetIngredients) {
    ingredientsAnimate.classList.remove("hidden");
    instructionsAnimate.classList.remove("hidden");
  }
} */

/* window.addEventListener("scroll", animateAbout);

function animateAbout() {
  const scrollPosition = window.scrollY;
  const targetAbout = aboutAnimate.offsetTop + 25;
  if (scrollPosition > targetAbout) {
    setTimeout(function () {
      aboutAnimate.classList.remove("hidden");
      imageAnimate.classList.remove("hidden");
    }, 1800);
  }
} */

/* window.addEventListener("scroll", animateArrow);

function animateArrow() {
  const scrollPosition = window.scrollY;
  const targetArrow = arrowAnimate.offsetTop + 25;
  if (scrollPosition > targetArrow) {
    setTimeout(function () {
      arrowAnimate.classList.remove("hidden");
    }, 2800);
  }
} */

/* window.addEventListener("scroll", animateFooter);

function animateFooter() {
  const scrollPosition = window.scrollY;
  const targetFooter = footerAnimate.offsetTop + 25;
  if (scrollPosition > targetFooter) {
    setTimeout(function () {
      footerAnimate.classList.remove("hidden");
    }, 2800);
  }
} */

function hideAll() {
  header.classList.add("hidden");
  ingredientsAnimate.classList.add("hidden");
  instructionsAnimate.classList.add("hidden");
  aboutAnimate.classList.add("hidden");
  imageAnimate.classList.add("hidden");
  arrowAnimate.classList.add("hidden");
  footerAnimate.classList.add("hidden");
}
