import express from "express";
import {
    allUsers,
    createUser,
    singleUser,
} from "../controllers/userControllers.js";

const userRouter = express.Router();

userRouter.route("/").get(allUsers).post(createUser);
userRouter.route("/:username").get(singleUser);

export default userRouter;
