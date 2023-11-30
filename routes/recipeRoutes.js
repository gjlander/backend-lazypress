import express from "express";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";

import {
    allRecipes,
    createRecipe,
    oneRecipe,
    editRecipe,
    findRecipesFromBlog,
    deleteRecipe,
    migrateMeals,
} from "../controllers/recipeControllers.js";

const recipeRouter = express.Router();

recipeRouter.use(express.json());

recipeRouter
    .route("/")
    .get(allRecipes)
    .post(ClerkExpressRequireAuth(), createRecipe);
recipeRouter
    .route("/:id")
    .get(oneRecipe)
    .put(ClerkExpressRequireAuth(), editRecipe)
    //not working with auth for some reason
    .delete(/*ClerkExpressRequireAuth(),*/ deleteRecipe);
//updated to get based on clerkId
recipeRouter.route("/blog/:id").get(findRecipesFromBlog);

recipeRouter.route("/migrate").post(migrateMeals);

export default recipeRouter;
