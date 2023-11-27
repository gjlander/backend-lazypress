import express from "express";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";

import {
  allBlogs,
  createBlog,
  oneBlog,
  editBlog,
  findBlogsFromUser,
  getClerkAuth,
  clerkPostTest,
} from "../controllers/blogControllers.js";

const blogRouter = express.Router();

blogRouter.use(express.json());

blogRouter.route("/").get(allBlogs).post(createBlog);
blogRouter.route("/:id").get(oneBlog).put(ClerkExpressRequireAuth(), editBlog);
//updated to get based on clerkId
blogRouter.route("/user/:id").get(findBlogsFromUser);
blogRouter
  .route("/protected/endpoint")
  .get(ClerkExpressRequireAuth(), getClerkAuth)
  .post(ClerkExpressRequireAuth(), clerkPostTest);

export default blogRouter;
