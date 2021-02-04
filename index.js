const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  });

// .then(() => {

//CREATE NEW RECIPE
let newRecipe = Recipe.create({
  title: "Pasta",
  level: "Easy Peasy",
  ingredients: ["pasta", "tomatoes", "cheese", "tomate-sauce"],
  cuisine: "Italian",
  dysType: "main_course",
  image:
    "https://cdn77-s3.lazycatkitchen.com/wp-content/uploads/2018/07/roasted-tomato-basil-portion-800x1200.jpg",
  duration: 30,
  creator: "Christian",
});
// .then((recipe) => {
//   console.log(recipe.title);
// })
// .catch(() => {
//   console.log("Wrong");
// });

//AD MANY RECIPES
let manyRecipes = Recipe.insertMany(data);
// .then((recipes) => {
//   recipes.forEach((recipe) => {
//     console.log(recipe.title);
//   });
// })
// .catch(() => {
//   console.log("error");
// });
//UPDATE RECIPE

let updatedRecipe = Recipe.updateOne(
  { title: "Rigatoni alla Genovese" },
  { duration: 100 }
);
// .then((recipe) => {
//   console.log("You have updated the recipe", recipe);
// })
// .catch(() => {
//   console.log("error");
// });

//DELETE ONE
let deletedRecipe = Recipe.deleteOne({ title: "Carrot Cake" });
// .then(() => {
//   console.log("You have delete the recipe");
// })
// .catch(() => {
//   console.log("error");
// });

Promise.all([newRecipe, manyRecipes, updatedRecipe, deletedRecipe])
  .then((recipe) => {
    console.log(recipe[0].title);
    recipe[1].forEach((recipe) => {
      console.log(recipe.title);
    });
    console.log("You have updated the recipe");
    console.log("You have delete the recipe");
    mongoose.connection.close();
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
