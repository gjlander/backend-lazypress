import express from "express";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";

import {
    allBlogs,
    createBlog,
    oneBlog,
    editBlog,
    findBlogsFromUser,
} from "../controllers/blogControllers.js";

const blogRouter = express.Router();

blogRouter.use(express.json());

blogRouter.route("/").get(allBlogs).post(createBlog);
blogRouter.route("/:id").get(oneBlog).put(editBlog);
//updated to get based on clerkId
blogRouter.route("/user/:id").get(findBlogsFromUser);
blogRouter
    .route("/protected/endpoint")
    .get(ClerkExpressRequireAuth(), (req, res) => {
        res.json(req.auth);
    })
    .post(ClerkExpressRequireAuth(), (req, res) => {
        // const { pages, dashboard, clerkUser, clerkUserId } = req.body;
        res.json(req.body);
    });

export default blogRouter;
