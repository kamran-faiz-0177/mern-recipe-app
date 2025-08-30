const RecipeModel = require("../Models/RecipeModel");

const CreateRecipe = async (req, res) => {
    try {
        const { title, description, imgUrl, email } = req.body;
        const recipe = new RecipeModel({ title, description, imgUrl, createdBy: email });
        await recipe.save();

        res.status(200).json({
            message: "recipe created sucessfully",
            success: true,
        })

    } catch (error) {
        res.status(500).json({
            message: error.message,
        })
    }
};

const FetchRecipe = async (req, res) => {
    try {
        const recipeList = await RecipeModel.find();

        res.status(200).json({
            message: "recipe fetch successfully",
            recipeList,
            success: true,
        })

    } catch (error) {
        res.status(500).json({
            message: error.message,
        })
    }
};

const FetchRecipeById = async (req, res) => {
    try {
        const { id } = req.params;
        const recipeList = await RecipeModel.findOne({ _id: id });

        if (!recipeList) {
            return res.status(404).json({
                message: "Recipe not found",
                success: false,
            });
        }

        res.status(200).json({
            message: "Single recipe fetched successfully",
            recipeList,
            success: true,
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

const FetchRecipeByEmail = async (req, res) => {
    try {
        const { email } = req.params;
        const recipeList = await RecipeModel.find({ createdBy: email });

        if (!recipeList) {
            return res.status(404).json({
                message: "Recipe not found",
            });
        }

        res.status(200).json({
            message: "my recipe fetched successfully",
            recipeList,
            success: true,
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

const UpdateRecipe = async (req, res) => {
    try {
        const id = req.params.id;
        const { title, description, imgUrl } = req.body;
        await RecipeModel.findByIdAndUpdate(id, { title, description, imgUrl });

        res.status(200).json({
            message: "recipe updated successfully",
            success: true,
        })

    } catch (error) {
        res.status(500).json({
            message: error.message,
        })
    }
};

const DeleteRecipe = async (req, res) => {
    try {
        const { id } = req.params;
        await RecipeModel.findByIdAndDelete(id)

        res.status(200).json({
            message: "recipe deleted successfully",
            success: true,
        })

    } catch (error) {
        res.status(500).json({
            message: error.message,
        })
    }
};

module.exports = { CreateRecipe, FetchRecipe, DeleteRecipe, UpdateRecipe, FetchRecipeById, FetchRecipeByEmail };