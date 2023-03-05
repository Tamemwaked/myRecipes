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
let saveIndex = 0;
function getRecipeData(ingredient) {
  $.get(`/recipes/${ingredient}`).then((loadedData) => {
    let data = dataFilter(loadedData);
    appendArray = [];
    const ammount = 4;

    for (let i = saveIndex; i < saveIndex + ammount; i++) {
      appendArray.push(data[i]);
    }
    saveIndex += ammount;
    const returnArray = appendArray;
    appendArray = [];

    if (saveIndex >= data.length) {
      console.log("no more");
      saveIndex = 0;
      return;
    }

    render(returnArray);
  });
}

function pagination(ingredient) {
  // $.get(`/pagenation/${ingredient}`).then((loadedData) => {
  //   let data = dataFilter(loadedData);
  //   render(data);
  // });
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
