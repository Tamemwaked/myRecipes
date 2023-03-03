const express = require("express");
const router = express.Router();
const axios = require("axios");

dairyIngredients = [
  "Cream",
  "Cheese",
  "Milk",
  "Butter",
  "Creme",
  "Ricotta",
  "Mozzarella",
  "Custard",
  "Cream Cheese",
];
glutenIngredients = ["Flour", "Bread", "spaghetti", "Biscuits", "Beer"];

router.get("/recipes/:ingredient", (req, res) => {
  const ingredient = req.params.ingredient;

  axios
    .get(
      `https://recipes-goodness-elevation.herokuapp.com/recipes/ingredient/${ingredient}`
    )
    .then((result) => {
      res.send(result.data.results);
    });
  res.status(200);
});

router.get("/dairy/:ingredient", (req, res) => {
  const ingredient = req.params.ingredient;

  axios
    .get(
      `https://recipes-goodness-elevation.herokuapp.com/recipes/ingredient/${ingredient}`
    )
    .then((result) => {
      recipes = result.data.results;
      let recipesWithOutDairy = recipesWithSensitive(recipes, dairyIngredients);

      res.send(recipesWithOutDairy);
    });

  res.status(200);
});

router.get("/gluten/:ingredient", (req, res) => {
  const ingredient = req.params.ingredient;

  axios
    .get(
      `https://recipes-goodness-elevation.herokuapp.com/recipes/ingredient/${ingredient}`
    )
    .then((result) => {
      recipes = result.data.results;
      let recipesWithOutgluten = recipesWithSensitive(
        recipes,
        glutenIngredients
      );
      res.send(recipesWithOutgluten);
    });

  res.status(200);
});

router.get("/DiaryAndGluten/:ingredient", (req, res) => {
  const ingredient = req.params.ingredient;

  axios
    .get(
      `https://recipes-goodness-elevation.herokuapp.com/recipes/ingredient/${ingredient}`
    )
    .then((result) => {
      recipes = result.data.results;
      let concatSensitive = dairyIngredients.concat(glutenIngredients);

      let recipesWithOutGlutenAndDiary = recipesWithSensitive(
        recipes,
        concatSensitive
      );

      res.send(recipesWithOutGlutenAndDiary);
    });

  res.status(200);
});

router.get("/singleRecipe/:idMeal", (req, res) => {
  const idMeal = req.params.idMeal;

  axios
    .get(
      `https://recipes-goodness-elevation.herokuapp.com/recipes/id/${idMeal}`
    )
    .then((result) => {
      let ingredient = result.data.ingredients[0];
      res.send(ingredient);
    });
  res.status(200);
});

function recipesWithSensitive(recipes, sensitives) {
  let singleRecipe = {};
  let recipesWithOutSensitive = [];
  let lowerCaseSensitive = [];
  sensitives.forEach((sensitive) => {
    lowerCaseSensitive.push(sensitive.toLowerCase());
  });

  for (let i = 0; i < recipes.length; i++) {
    singleRecipe = {};
    for (let j = 0; j < recipes[i].ingredients.length; j++) {
      let splitedIngredients = recipes[i].ingredients[j].split(" ");

      splitedIngredients.forEach((ingredient) => {
        if (lowerCaseSensitive.includes(ingredient.toLowerCase())) {
          singleRecipe = recipes[i];
        }
      });
    }
    if (Object.keys(singleRecipe).length === 0) {
      recipesWithOutSensitive.push(recipes[i]);
    }
  }
  return recipesWithOutSensitive;
}

module.exports = router;
