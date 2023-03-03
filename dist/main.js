function getRecipe() {
  let ingredient = $("#ingredient").val();
  if ($("#dairy").prop("checked") && !$("#gluten").prop("checked")) {
    $.get(`/dairy/${ingredient}`).then((loadedData) => {
      let data = dataFilter(loadedData);
      render(data);
      console.log("diary server");
    });
  } else if ($("#gluten").prop("checked") && !$("#dairy").prop("checked")) {
    $.get(`/gluten/${ingredient}`).then((loadedData) => {
      let data = dataFilter(loadedData);
      render(data);
      console.log("glutin server");
    });
  } else if ($("#gluten").prop("checked") && $("#dairy").prop("checked")) {
    $.get(`/DiaryAndGluten/${ingredient}`).then((loadedData) => {
      let data = dataFilter(loadedData);
      render(data);
      console.log("glutin and diary server");
    });
  } else {
    $.get(`/recipes/${ingredient}`).then((loadedData) => {
      let data = dataFilter(loadedData);
      render(data);
      console.log("recipes server");
    });
  }
}

$("#resipes").on("click", ".picture", function () {
  let imgId = $(this).data().id;
  $.get(`/singleRecipe/${imgId}`).then((firstIngredient) => {
    alert(firstIngredient);
  });
});

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

function render(data) {
  const source = $("#recipes-template").html();
  const template = Handlebars.compile(source);
  let newHtml = template(data);
  $("#resipes").empty().append(newHtml);
}
