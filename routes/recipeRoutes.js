import express from "express";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";

import {
    allRecipes,
    createRecipe,
    oneRecipe,
    editRecipe,
    findRecipesFromUser,
    deleteRecipePage,
    migrateMeals,
} from "../controllers/recipeControllers.js";

const recipeRouter = express.Router();

recipeRouter.use(express.json());

recipeRouter.route("/").get(allRecipes).post(createRecipe);
recipeRouter
    .route("/:id")
    .get(oneRecipe)
    .put(/*ClerkExpressRequireAuth(),*/ editRecipe)
    .delete(deleteRecipePage);
//updated to get based on clerkId
recipeRouter.route("/user/:id").get(findRecipesFromUser);

recipeRouter.route("/migrate/").post(migrateMeals);

export default recipeRouter;
