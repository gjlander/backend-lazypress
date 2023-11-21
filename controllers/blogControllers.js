import ErrorStatus from "../utils/errorStatus.js";
import BlogModel from "../models/blogModel.js";

const allBlogs = async (req, res, next) => {
    try {
        const getBlogs = await BlogModel.find().populate("clerkUser");
        return res.json(getBlogs);
    } catch (error) {
        next(error);
    }
};

const createBlog = async (req, res, next) => {
    try {
        const { home, clerkUser, dashboard, clerkUserId } = req.body;
        if (!home || !dashboard || !clerkUserId || !clerkUser)
            throw new ErrorStatus("Missing required fields", 400);

        const newBlog = await BlogModel.create({
            pages: {
                home,
            },
            dashboard,
            clerkUser,
            clerkUserId,
        });

        return res.status(201).json(newBlog);
    } catch (error) {
        next(error);
    }
};

const oneBlog = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!id.match(/^[a-f\d]{24}$/i))
            throw new ErrorStatus("Invalid Id", 400);

        const findBlog = await BlogModel.findById(id);

        return res.json(findBlog);
    } catch (error) {
        next(error);
    }
};

//works, but if values are left blank, they override and removed from the document
const editBlog = async (req, res, next) => {
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
                401
            );

        const updatedBlog = await BlogModel.findByIdAndUpdate(
            id,
            {
                pages,
                dashboard,
                clerkUser,
                clerkUserId,
            },
            { new: true, runValidators: true }
        );

        if (!updatedBlog)
            throw new ErrorStatus(
                `Blog with id of ${id} could not be found`,
                404
            );
        console.log("req.auth", userId);
        console.log("req.body", clerkUserId);
        return res.json(updatedBlog);
    } catch (error) {
        next(error);
    }
};

const findBlogsFromUser = async (req, res, next) => {
    try {
        const { id } = req.params;

        // if (!id.match(/^[a-f\d]{24}$/i))
        //     throw new ErrorStatus("Invalid Id", 400);

        const findBlog = await BlogModel.find({ clerkUserId: id });
        // .populate(
        //     "clerkUser"
        // );

        return res.json(findBlog);
    } catch (error) {
        next(error);
    }
};
const getClerkAuth = async (req, res) => {
    const { userId } = req.auth;
    res.json(userId);
};
const clerkPostTest = async (req, res) => {
    // const { pages, dashboard, clerkUser, clerkUserId } = req.body;
    res.json(req.body);
};

export {
    allBlogs,
    createBlog,
    oneBlog,
    editBlog,
    findBlogsFromUser,
    getClerkAuth,
    clerkPostTest,
};
