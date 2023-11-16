import express from "express";
import {
    allUsers,
    createUser,
    singleUser,
    updateUser,
    deactivateUser,
} from "../controllers/userControllers.js";

const userRouter = express.Router();

userRouter.use(express.json());

userRouter.route("/").get(allUsers).post(createUser);
userRouter
    .route("/:id")
    .get(singleUser)
    .patch(updateUser)
    .delete(deactivateUser);

export default userRouter;
