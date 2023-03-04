function dataFilter(loadedData) {
  let appendRecipe = [];
  let allRecipes = loadedData;
  for (let recipe of allRecipes) {
    let singleRecipe = {};
    singleRecipe.idMeal = recipe.idMeal;
    singleRecipe.ingredients = recipe.ingredients;
    singleRecipe.title = recipe.title;
    singleRecipe.thumbnail = recipe.thumbnail;
    singleRecipe.href = recipe.href;
    appendRecipe.push(singleRecipe);
  }
  return appendRecipe;
}

function getRecipeData(ingredient) {
  $.get(`/recipes/${ingredient}`).then((loadedData) => {
    let data = dataFilter(loadedData);
    render(data);
  });
}

function getDairyRecipeData(ingredient) {
  $.get(`/dairy/${ingredient}`).then((loadedData) => {
    let data = dataFilter(loadedData);
    render(data);
  });
}

function getGlutenRecipeData(ingredient) {
  $.get(`/gluten/${ingredient}`).then((loadedData) => {
    let data = dataFilter(loadedData);
    render(data);
  });
}

function getDairyAndGlutenRecipeData(ingredient) {
  $.get(`/DiaryAndGluten/${ingredient}`).then((loadedData) => {
    let data = dataFilter(loadedData);
    render(data);
  });
}

function getFirstIngredientData(imgId) {
  $.get(`/singleRecipe/${imgId}`).then((firstIngredient) => {
    alert(firstIngredient);
  });
}
