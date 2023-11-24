import express from "express";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";

import {
    allBlogs,
    createBlog,
    oneBlog,
    editBlog,
    findBlogsFromUser,
    addBlogPage,
    deleteBlogPage,
    addHero,
    deleteHero,
    singlePage,
    getClerkAuth,
    clerkPostTest,
    migrateMeals,
} from "../controllers/blogControllers.js";

const blogRouter = express.Router();

blogRouter.use(express.json());

blogRouter.route("/").get(allBlogs).post(createBlog);
blogRouter.route("/:id").get(oneBlog).put(ClerkExpressRequireAuth(), editBlog);
//updated to get based on clerkId
blogRouter.route("/user/:id").get(findBlogsFromUser);
blogRouter.route("/:blogId/:pageId").get(singlePage);

//didn't end up needing them, but hey, I learned something
blogRouter.route("/blogPages/:id").post(addBlogPage).delete(deleteBlogPage);
blogRouter.route("/hero/:id").post(addHero).delete(deleteHero);

blogRouter.route("/migrate/:id").post(migrateMeals);

blogRouter
    .route("/protected/endpoint")
    .get(ClerkExpressRequireAuth(), getClerkAuth)
    .post(ClerkExpressRequireAuth(), clerkPostTest);

export default blogRouter;
