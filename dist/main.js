function getRecipe() {
  let ingredient = $("#ingredient").val();

  if ($("#dairy").prop("checked") && !$("#gluten").prop("checked")) {
    getDairyRecipeData(ingredient);
  } else if ($("#gluten").prop("checked") && !$("#dairy").prop("checked")) {
    getGlutenRecipeData(ingredient);
  } else if ($("#gluten").prop("checked") && $("#dairy").prop("checked")) {
    getDairyAndGlutenRecipeData(ingredient);
  } else {
    getRecipeData(ingredient);
  }
}

$("#resipes").on("click", ".picture", function () {
  let imgId = $(this).data().id;
  getFirstIngredientData(imgId);
});
