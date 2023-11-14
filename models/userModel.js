import { Schema, model } from "mongoose";

const userSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true,
            maxlength: 20,
            match: [
                /^[a-zA-Z-\s]+$/,
                "must contain only letters and up to 20 characters",
            ],
        },
        lastName: {
            type: String,
            required: true,
            maxlength: 20,
            match: [
                /^[a-zA-Z-\s]+$/,
                "must contain only letters and up to 20 characters",
            ],
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [
                /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
                "is not a valid email",
            ],
        },
        username: {
            type: String,
            required: true,
            unique: true,
            maxlength: 20,
            // match: [
            //     /^[a-zA-Z-\s]+$/,
            //     "must contain only letters and up to 20 characters",
            // ],
        },
        password: {
            type: String,
            required: true,
            select: false,
        },
    },

    {
        timestamps: true,
    }
);

const UserModel = model("User", userSchema);

export default UserModel;
