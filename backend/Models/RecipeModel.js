const mongoose = require("mongoose");
const Scehma = mongoose.Schema;

const RecipeSchema = new Scehma({
    title: {
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    imgUrl:{
        type: String,
        required: true,
    },
    createdBy: {
        type: String,
        required: true,
    }
},{timestamps: true});

const RecipeModel = mongoose.model("Recipe",RecipeSchema);
module.exports = RecipeModel;
