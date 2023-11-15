import ErrorStatus from "../utils/errorStatus.js";
import BlogModel from "../models/blogModel.js";

const allBlogs = async (req, res, next) => {
    try {
        const getBlogs = await BlogModel.find().populate("user");
        return res.json(getBlogs);
    } catch (error) {
        next(error);
    }
};

const createBlog = async (req, res, next) => {
    try {
        const { navBar, hero, cards, user } = req.body;
        if (!navBar || !hero || !cards || !user)
            throw new ErrorStatus("Missing required fields", 400);

        const newBlog = await BlogModel.create({
            pages: {
                home: {
                    navBar,
                    hero,
                    cards,
                },
            },
            user,
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

        const findBlog = await BlogModel.findById(id).populate("user");

        return res.json(findBlog);
    } catch (error) {
        next(error);
    }
};

//need to update
const editBlog = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!id.match(/^[a-f\d]{24}$/i))
            throw new ErrorStatus("Invalid Id", 400);

        const { duckName, imgSrc, quote, owner } = req.body;
        if (!duckName && !imgSrc && !quote && !owner)
            throw new ErrorStatus("Please provide at least one field", 400);

        const updatedBlog = await BlogModel.findByIdAndUpdate(
            id,
            {
                duckName,
                imgSrc,
                quote,
                owner,
            },
            { new: true, runValidators: true }
        ).populate("owner");

        if (!updatedBlog)
            throw new ErrorStatus(
                `Blog with id of ${id} could not be found`,
                404
            );

        return res.json(updatedBlog);
    } catch (error) {
        next(error);
    }
};

const findBlogsFromUser = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!id.match(/^[a-f\d]{24}$/i))
            throw new ErrorStatus("Invalid Id", 400);

        const findBlog = await BlogModel.find({ user: id }).populate("user");

        return res.json(findBlog);
    } catch (error) {
        next(error);
    }
};

export { allBlogs, createBlog, oneBlog, editBlog, findBlogsFromUser };
