const router = require("express").Router();
const { CreateRecipe, FetchRecipe, DeleteRecipe, UpdateRecipe, FetchRecipeById, FetchRecipeByEmail } = require("../Controllers/RecipeController");

router.post("/create",CreateRecipe);
router.get("/fetch",FetchRecipe);
router.get("/fetch/:id",FetchRecipeById);
router.get("/fetchmyrecipe/:email",FetchRecipeByEmail);
router.put("/update/:id",UpdateRecipe);
router.delete("/delete/:id",DeleteRecipe);

module.exports = router;