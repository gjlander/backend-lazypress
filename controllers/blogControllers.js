import ErrorStatus from "../utils/errorStatus.js";
import BlogModel from "../models/blogModel.js";
import { recipePagesIndex } from "../db/algoliaClient.js";
// import {saveObjects} from "algoliasearch"

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
        const { pages, clerkUser, dashboard, clerkUserId } = req.body;
        if (!pages || !dashboard || !clerkUserId || !clerkUser)
            throw new ErrorStatus("Missing required fields", 400);

        const newBlog = await BlogModel.create({
            pages,
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
                403
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
const getBlogPages = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!id.match(/^[a-f\d]{24}$/i))
            throw new ErrorStatus("Invalid Id", 400);

        const parentBlog = await BlogModel.findById(id);
        const childPages = parentBlog.pages.home.blogPages;
        // childPages.push(req.body);

        // await parentBlog.save();

        return res.json(childPages);
    } catch (error) {
        next(error);
    }
};

const addBlogPage = async (req, res, next) => {
    try {
        const { id } = req.params;

        // const { userId } = req.auth;
        // const { title, category, region, ingList, steps, imgUrl } = req.body;

        // if (!userId) throw new ErrorStatus("Missing userId", 400);

        if (!id.match(/^[a-f\d]{24}$/i))
            throw new ErrorStatus("Invalid Id", 400);

        // if (!title || !category || !region || !ingList || !steps || !imgUrl)
        //     throw new ErrorStatus(
        //         "All fields must be present to make new blog page.",
        //         400
        //     );
        // if (userId !== clerkUserId)
        //     throw new ErrorStatus(
        //         "You are not authorized to make changes to this site",
        //         401
        //     );

        const parentBlog = await BlogModel.findById(id);
        const childPages = parentBlog.pages.home.blogPages;
        childPages.push(req.body);

        await parentBlog.save();

        const newPage = childPages.slice(-1);

        const { _doc } = newPage[0];
        const algPage = { ..._doc, objectID: newPage[0]._id.toString() };

        const algId = await recipePagesIndex.saveObject(algPage, {
            autoGenerateObjectIDIfNotExist: false,
        });

        console.log(algId);
        return res.status(201).json(newPage[0]);
    } catch (error) {
        next(error);
    }
};

const addHero = async (req, res, next) => {
    try {
        const { id } = req.params;
        // const { userId } = req.auth;
        const { imgUrl, title, text, button } = req.body;

        // if (!userId) throw new ErrorStatus("Missing userId", 400);

        if (!id.match(/^[a-f\d]{24}$/i))
            throw new ErrorStatus("Invalid Id", 400);

        if (!imgUrl || !title || !text || !button)
            throw new ErrorStatus(
                "All fields must be present to make new hero banner.",
                400
            );
        // if (userId !== clerkUserId)
        //     throw new ErrorStatus(
        //         "You are not authorized to make changes to this site",
        //         401
        //     );

        const parentBlog = await BlogModel.findById(id);
        const childHeroes = parentBlog.pages.home.hero;
        childHeroes.push({ imgUrl, title, text, button });

        await parentBlog.save();

        return res.status(201).json(childHeroes);
    } catch (error) {
        next(error);
    }
};

const deleteHero = async (req, res, next) => {
    try {
        const { id } = req.params;
        // const { userId } = req.auth;
        const { heroId } = req.body;

        // if (!userId) throw new ErrorStatus("Missing userId", 400);

        if (!id.match(/^[a-f\d]{24}$/i))
            throw new ErrorStatus("Invalid Id", 400);

        // if (userId !== clerkUserId)
        //     throw new ErrorStatus(
        //         "You are not authorized to make changes to this site",
        //         403
        //     );

        const parentBlog = await BlogModel.findById(id);
        const childHero = parentBlog.pages.home.hero.id(heroId);
        childHero.deleteOne();

        await parentBlog.save();

        return res.json(`Successfully deleted hero: ${heroId}`);
    } catch (error) {
        next(error);
    }
};
const singlePage = async (req, res, next) => {
    try {
        const { blogId, pageId } = req.params;

        if (!blogId.match(/^[a-f\d]{24}$/i) || !pageId.match(/^[a-f\d]{24}$/i))
            throw new ErrorStatus("Invalid Id", 400);

        const parentBlog = await BlogModel.findById(blogId);
        const childPage = parentBlog.pages.home.blogPages.id(pageId);

        return res.json(childPage);
    } catch (error) {
        next(error);
    }
};
const editBlogPages = async (req, res, next) => {
    try {
        const { id } = req.params;
        const pageUpdates = req.body;

        if (!blogId.match(/^[a-f\d]{24}$/i) || !pageId.match(/^[a-f\d]{24}$/i))
            throw new ErrorStatus("Invalid Id", 400);

        // const parentBlog = await BlogModel.findById(blogId);
        // let childPage = parentBlog.pages.home.blogPages.id(pageId);
        // childPage = pageEdits;

        // await parentBlog.save();
        const updatedBlog = await BlogModel.findByIdAndUpdate(
            id,
            {
                pages: {
                    home: {
                        blogPages: pageUpdates,
                    },
                },
            },
            { new: true, runValidators: true }
        );

        return res.json(updatedBlog.pages.home.blogPages);
    } catch (error) {
        next(error);
    }
};
const deleteBlogPage = async (req, res, next) => {
    try {
        const { blogId, pageId } = req.params;
        // const { userId } = req.auth;

        // if (!userId) throw new ErrorStatus("Missing userId", 400);

        if (!blogId.match(/^[a-f\d]{24}$/i) || !pageId.match(/^[a-f\d]{24}$/i))
            throw new ErrorStatus("Invalid Id", 400);

        // if (userId !== clerkUserId)
        //     throw new ErrorStatus(
        //         "You are not authorized to make changes to this site",
        //         403
        //     );

        const parentBlog = await BlogModel.findById(blogId);
        const childPage = parentBlog.pages.home.blogPages.id(pageId);
        childPage.deleteOne();

        await parentBlog.save();
        await recipePagesIndex.deleteObject(pageId);

        return res.json(`Successfully deleted blogPage ${pageId}`);
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

const migrateMeals = async (req, res, next) => {
    try {
        const { id } = req.params;
        const mealsArray = req.body;
        // const { userId } = req.auth;
        // const { title, category, region, ingList, steps, imgUrl } = req.body;

        if (!id.match(/^[a-f\d]{24}$/i))
            throw new ErrorStatus("Invalid Id", 400);

        // if (!title || !category || !region || !ingList || !steps || !imgUrl)
        //     throw new ErrorStatus(
        //         "All fields must be present to make new blog page.",
        //         400
        //     );

        const parentBlog = await BlogModel.findById(id);
        const childPages = parentBlog.pages.home.blogPages;
        mealsArray.forEach((meal) => childPages.push(meal));
        // childPages.push(req.body);

        await parentBlog.save();

        const algPages = childPages.map((page) => {
            // const { steps, videoUrl, ...rest } = page;
            // const algObj = { ...rest, objectID: page._id };
            const { _doc } = page;
            const algPage = { ..._doc, objectID: page._id.toString() };
            // page.objectID = page._id.toString();
            // console.log(page._id.toString());
            // console.log("page", page);
            return algPage;
        });

        // console.log("algPage", algPages[0]);
        const algIds = await recipePagesIndex.saveObjects(algPages, {
            autoGenerateObjectIDIfNotExist: false,
        });
        // recipePagesIndex
        //     .saveObjects(algPages, {
        //         autoGenerateObjectIDIfNotExist: false,
        //     })
        //     .then((ids) => console.log(ids))
        //     .catch((err) => next(err));
        console.log(algIds);

        return res.status(201).json(algPages);
    } catch (error) {
        next(error);
    }
};

export {
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
};
