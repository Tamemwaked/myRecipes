const express = require("express");
const path = require("path");
const axios = require("axios");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "dist")));
app.use(express.static(path.join(__dirname, "node_modules")));
const port = 3000;
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
app.listen(port, function () {
  console.log(`Running server on port ${port}`);
});

app.get("/recipes/:ingredient", (req, res) => {
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

app.get("/dairy/:ingredient", (req, res) => {
  const ingredient = req.params.ingredient;

  axios
    .get(
      `https://recipes-goodness-elevation.herokuapp.com/recipes/ingredient/${ingredient}`
    )
    .then((result) => {
      recipes = result.data.results;
      let singleRecipe = {};
      let recipesWithOutDairy = [];

      for (let i = 0; i < recipes.length; i++) {
        singleRecipe = {};
        for (let j = 0; j < recipes[i].ingredients.length; j++) {
          let ingArr = recipes[i].ingredients[j].split(" ");

          ingArr.forEach((ing) => {
            if (dairyIngredients.includes(ing)) {
              singleRecipe = recipes[i];
            }
          });
        }
        if (Object.keys(singleRecipe).length === 0) {
          recipesWithOutDairy.push(recipes[i]);
        }
      }
      console.log(recipesWithOutDairy.length);
      res.send(recipesWithOutDairy);
    });

  res.status(200);
});

app.get("/gluten/:ingredient", (req, res) => {
  const ingredient = req.params.ingredient;

  axios
    .get(
      `https://recipes-goodness-elevation.herokuapp.com/recipes/ingredient/${ingredient}`
    )
    .then((result) => {
      recipes = result.data.results;
      let singleRecipe = {};
      let recipesWithOutgluten = [];

      for (let i = 0; i < recipes.length; i++) {
        singleRecipe = {};
        for (let j = 0; j < recipes[i].ingredients.length; j++) {
          let ingArr = recipes[i].ingredients[j].split(" ");

          ingArr.forEach((ing) => {
            if (glutenIngredients.includes(ing)) {
              singleRecipe = recipes[i];
            }
          });
        }
        if (Object.keys(singleRecipe).length === 0) {
          recipesWithOutgluten.push(recipes[i]);
        }
      }
      console.log(recipesWithOutgluten.length);
      res.send(recipesWithOutgluten);
    });

  res.status(200);
});

app.get("/DiaryAndGluten/:ingredient", (req, res) => {
  const ingredient = req.params.ingredient;

  axios
    .get(
      `https://recipes-goodness-elevation.herokuapp.com/recipes/ingredient/${ingredient}`
    )
    .then((result) => {
      recipes = result.data.results;
      let singleRecipe = {};
      let recipesWithOutGlutenDiary = [];

      for (let i = 0; i < recipes.length; i++) {
        singleRecipe = {};
        for (let j = 0; j < recipes[i].ingredients.length; j++) {
          let ingArr = recipes[i].ingredients[j].split(" ");

          ingArr.forEach((ing) => {
            if (
              glutenIngredients.includes(ing) ||
              dairyIngredients.includes(ing)
            ) {
              singleRecipe = recipes[i];
            }
          });
        }
        if (Object.keys(singleRecipe).length === 0) {
          recipesWithOutGlutenDiary.push(recipes[i]);
        }
      }
      console.log(recipesWithOutGlutenDiary.length);
      res.send(recipesWithOutGlutenDiary);
    });

  res.status(200);
});
