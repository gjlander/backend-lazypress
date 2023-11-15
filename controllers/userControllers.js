import ErrorStatus from "../utils/errorStatus.js";
import UserModel from "../models/userModel.js";

const allUsers = async (req, res, next) => {
    try {
        const getUsers = await UserModel.find({ active: true });
        return res.json(getUsers);
    } catch (error) {
        next(error);
    }
};

const createUser = async (req, res, next) => {
    try {
        const { firstName, lastName, email, username, password } = req.body;
        if (!firstName || !lastName || !email || !username || !password)
            throw new ErrorStatus("Missing required fields", 400);

        const newUser = await UserModel.create({
            firstName,
            lastName,
            email,
            username,
            password,
        });

        return res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
};

const singleUser = async (req, res, next) => {
    const { login, password } = req.body;
    if (!login || !password)
        throw new ErrorStatus("Missing required fields", 400);
    try {
        const getUser = await UserModel.find({
            $and: [
                { $or: [{ username: login }, { email: login }] },
                { password },
            ],
        }).select("+password");
        console.log(getUser);
        // if (login !== getUser.email && login !== getUser.username) {
        //     throw new ErrorStatus("Invalid username or password", 400);
        // }
        return res.json(getUser);
    } catch (error) {
        next(error);
    }
};

const updateUser = async (req, res, next) => {
    const {
        params: { id },
        body: { firstName, lastName, username, password },
    } = req;
    if (!firstName && !lastName && !username && !password)
        throw new ErrorStatus("Missing required field", 400);
    try {
        let updatedUser;
        if (firstName) {
            updatedUser = await UserModel.findByIdAndUpdate(
                id,
                { firstName },
                { runValidators: true, new: true }
            );
        }
        if (lastName) {
            updatedUser = await UserModel.findByIdAndUpdate(
                id,
                { lastName },
                { runValidators: true, new: true }
            );
        }
        if (username) {
            updatedUser = await UserModel.findByIdAndUpdate(
                id,
                { username },
                { runValidators: true, new: true }
            );
        }
        if (password) {
            updatedUser = await UserModel.findByIdAndUpdate(
                id,
                { password },
                { runValidators: true, new: true }
            ).select("+password");
        }

        console.log(updatedUser);

        return res.json(updatedUser);
    } catch (error) {
        next(error);
    }
};

const deactivateUser = async (req, res, next) => {
    const { id } = req.params;
    try {
        const deactivatedUser = await UserModel.findByIdAndUpdate(
            id,
            { active: false },
            { new: true }
        );
        console.log(deactivatedUser);
        return res.json(deactivatedUser);
    } catch (error) {
        next(error);
    }
};

export { allUsers, singleUser, createUser, updateUser, deactivateUser };
