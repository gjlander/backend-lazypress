import express from "express";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";

import {
    allBlogs,
    createBlog,
    oneBlog,
    editBlog,
    findBlogsFromUser,
    getBlogPages,
    addBlogPage,
    deleteBlogPage,
    addHero,
    deleteHero,
    singlePage,
    editBlogPages,
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
blogRouter
    .route("/singlepage/:blogId/:pageId")
    .get(singlePage)
    // .put(editBlogPages)
    .delete(deleteBlogPage);

//ended up needing them!
blogRouter
    .route("/blogPages/:id")
    .get(getBlogPages)
    .post(addBlogPage)
    .put(editBlogPages);
// .delete(deleteBlogPage);
blogRouter.route("/hero/:id").post(addHero).delete(deleteHero);

blogRouter.route("/migrate/:id").post(migrateMeals);

blogRouter
    .route("/protected/endpoint")
    .get(ClerkExpressRequireAuth(), getClerkAuth)
    .post(ClerkExpressRequireAuth(), clerkPostTest);

export default blogRouter;
