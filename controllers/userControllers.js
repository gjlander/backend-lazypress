import ErrorStatus from "../utils/errorStatus.js";
import UserModel from "../models/userModel.js";

const allUsers = async (req, res, next) => {
    try {
        const getUsers = await UserModel.find().sort("-battlesWon");
        return res.json(getUsers);
    } catch (error) {
        next(error);
    }
};

const singleUser = async (req, res, next) => {
    const { username } = req.params;
    const { password } = req.body;
    try {
        const getUser = await UserModel.findOne({ username });
        console.log(getUser);
        //for now doesn't use password, when I refactor for auth it will
        // if (password !== getUser.password) {
        //     throw new ErrorStatus("Invalid username or password", 400);
        // }
        return res.json(getUser);
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

export { allUsers, singleUser, createUser };
