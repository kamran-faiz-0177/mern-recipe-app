const express = require("express");
const app = express();
const cors = require("cors");
const UserRouter = require("./Routes/UserRouter");
const RecipeRouter = require("./Routes/RecipeRouter");

require("dotenv").config();
require("./Models/db");
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use("/api/user", UserRouter);
app.use("/api/recipe", RecipeRouter);


app.get("/", (req, res) => {
    res.send("hello from backend :) ");
})

app.listen(PORT, () => {
    console.log(`app is running at this port`, PORT);
})