import express from "express";
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

export default blogRouter;
