const recipes = [];

function getRecipe() {
  let ingredient = $("#ingredient").val();
  $.get(`/recipes/${ingredient}`).then((loadedData) => {
    let data = dataFilter(loadedData);
    render(data);

    // let sensetive = $('input[name="interest"]:checked').serialize();
    // console.log(sensetive.substring(9));
  });
}

$("#resipes").on("click", ".picture", function () {
  let imgId = $(this).data().id;
  let index = recipes.findIndex((recipe) => recipe.idMeal == imgId);
  let ingredient = recipes[index].ingredients[0];
  alert(ingredient);
});

function dataFilter(loadedData) {
  let appendRecipe = [];
  let allRecipes = loadedData.results;
  for (let recipe of allRecipes) {
    let singleRecipe = {};
    singleRecipe.idMeal = recipe.idMeal;
    singleRecipe.ingredients = recipe.ingredients;
    singleRecipe.title = recipe.title;
    singleRecipe.thumbnail = recipe.thumbnail;
    singleRecipe.href = recipe.href;
    appendRecipe.push(singleRecipe);
    recipes.push(singleRecipe);
  }
  return appendRecipe;
}

function render(data) {
  const source = $("#recipes-template").html();
  const template = Handlebars.compile(source);
  let newHtml = template(data);
  $("#resipes").empty().append(newHtml);
}
