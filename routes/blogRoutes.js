import express from "express";
import {
    allBlogs,
    createBlog,
    oneBlog,
    editBlog,
    findBlogsFromUser,
} from "../controllers/blogControllers.js";

const blogRouter = express.Router();

blogRouter.route("/").get(allBlogs).post(createBlog);
blogRouter.route("/:id").get(oneBlog).put(editBlog);
blogRouter.route("/user/:id").get(findBlogsFromUser);

export default blogRouter;
