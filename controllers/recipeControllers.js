import ErrorStatus from "../utils/errorStatus.js";
import RecipeModel from "../models/recipeModel.js";
import { recipesIndex } from "../db/algoliaClient.js";
// import {saveObjects} from "algoliasearch"

const allRecipes = async (req, res, next) => {
    try {
        const getRecipes = await RecipeModel.find().populate("clerkUser");
        return res.json(getRecipes);
    } catch (error) {
        next(error);
    }
};

const createRecipe = async (req, res, next) => {
    try {
        const {
            title,
            category,
            region,
            ingList,
            steps,
            imgUrl,
            videoUrl,
            tags,
            clerkUser,
            clerkUserId,
            blog,
        } = req.body;
        if (
            !title ||
            !category ||
            !region ||
            !ingList ||
            !steps ||
            !imgUrl ||
            !videoUrl ||
            !tags ||
            !clerkUser ||
            !clerkUserId ||
            !blog
        )
            throw new ErrorStatus("Missing required fields", 400);

        const newRecipe = await RecipeModel.create({
            title,
            category,
            region,
            ingList,
            steps,
            imgUrl,
            videoUrl,
            tags,
            clerkUser,
            clerkUserId,
            blog,
        });
        const getRecipe = await RecipeModel.findById(newRecipe._id);

        const { _doc } = getRecipe;
        const algPage = { ..._doc, objectID: newRecipe._id.toString() };

        // console.log("algPage", algPages[0]);
        const algIds = await recipesIndex.saveObject(algPage, {
            autoGenerateObjectIDIfNotExist: false,
        });

        console.log(algIds);

        return res.status(201).json(newRecipe);
    } catch (error) {
        next(error);
    }
};

const oneRecipe = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!id.match(/^[a-f\d]{24}$/i))
            throw new ErrorStatus("Invalid Id", 400);

        const findRecipe = await RecipeModel.findById(id);

        return res.json(findRecipe);
    } catch (error) {
        next(error);
    }
};

//works, but if values are left blank, they override and removed from the document
const editRecipe = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { userId } = req.auth;
        const { pages, dashboard, clerkUser, clerkUserId } = req.body;

        if (!userId) throw new ErrorStatus("Missing userId", 400);

        if (!id.match(/^[a-f\d]{24}$/i))
            throw new ErrorStatus("Invalid Id", 400);

        if (!pages || !dashboard || !clerkUser || !clerkUserId)
            throw new ErrorStatus(
                "All fields must be present to properly update document",
                400
            );
        if (userId !== clerkUserId)
            throw new ErrorStatus(
                "You are not authorized to make changes to this site",
                403
            );

        const updatedRecipe = await RecipeModel.findByIdAndUpdate(
            id,
            {
                pages,
                dashboard,
                clerkUser,
                clerkUserId,
            },
            { new: true, runValidators: true }
        );

        if (!updatedRecipe)
            throw new ErrorStatus(
                `Recipe with id of ${id} could not be found`,
                404
            );
        console.log("req.auth", userId);
        console.log("req.body", clerkUserId);
        return res.json(updatedRecipe);
    } catch (error) {
        next(error);
    }
};

const findRecipesFromUser = async (req, res, next) => {
    try {
        const { id } = req.params;

        // if (!id.match(/^[a-f\d]{24}$/i))
        //     throw new ErrorStatus("Invalid Id", 400);

        const findRecipe = await RecipeModel.find({ clerkUserId: id });
        // .populate(
        //     "clerkUser"
        // );

        return res.json(findRecipe);
    } catch (error) {
        next(error);
    }
};

const deleteRecipePage = async (req, res, next) => {
    try {
        const { recipeId, pageId } = req.params;
        // const { userId } = req.auth;

        // if (!userId) throw new ErrorStatus("Missing userId", 400);

        if (
            !recipeId.match(/^[a-f\d]{24}$/i) ||
            !pageId.match(/^[a-f\d]{24}$/i)
        )
            throw new ErrorStatus("Invalid Id", 400);

        // if (userId !== clerkUserId)
        //     throw new ErrorStatus(
        //         "You are not authorized to make changes to this site",
        //         403
        //     );

        const parentRecipe = await RecipeModel.findById(recipeId);
        const childPage = parentRecipe.pages.home.recipePages.id(pageId);
        childPage.deleteOne();

        await parentRecipe.save();
        await recipesIndex.deleteObject(pageId);

        return res.json(`Successfully deleted recipePage ${pageId}`);
    } catch (error) {
        next(error);
    }
};

const migrateMeals = async (req, res, next) => {
    try {
        const mealsArray = req.body;

        for (const meal of mealsArray) {
            const {
                title,
                category,
                region,
                ingList,
                steps,
                imgUrl,
                videoUrl,
                tags,
            } = meal;
            await RecipeModel.create({
                title,
                category,
                region,
                ingList,
                steps,
                imgUrl,
                videoUrl,
                tags,
            });
        }

        const getRecipes = await RecipeModel.find();
        const algPages = getRecipes.map((page) => {
            const { _doc } = page;
            const algPage = { ..._doc, objectID: page._id.toString() };

            return algPage;
        });

        // console.log("algPage", algPages[0]);
        const algIds = await recipesIndex.saveObjects(algPages, {
            autoGenerateObjectIDIfNotExist: false,
        });

        console.log(algIds);

        return res.status(201).json(getRecipes);
    } catch (error) {
        next(error);
    }
};

export {
    allRecipes,
    createRecipe,
    oneRecipe,
    editRecipe,
    findRecipesFromUser,
    deleteRecipePage,
    migrateMeals,
};
