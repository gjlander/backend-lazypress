import { Schema, model } from "mongoose";

const userSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true,
            maxlength: 100,
            match: [
                //long regex for allowing most international names
                /^[\p{Letter}\s\-.']+$/u,
                "cannot contain special characters, and only up to 100 characters",
            ],
        },
        lastName: {
            type: String,
            required: true,
            maxlength: 100,
            match: [
                /^[\p{Letter}\s\-.']+$/u,
                "cannot contain special characters, and only up to 100 characters",
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
            minLength: 3,
            maxlength: 20,
            match: [
                /^[0-9A-Za-z]+$/,
                "must contain only alphanumeric characters, between 3 and 20 characters",
            ],
        },
        password: {
            type: String,
            required: true,
            select: false,
            //currently no password requirements so I can easily remember test user passwords XD
        },
        active: {
            type: Boolean,
            default: true,
        },
    },

    {
        timestamps: true,
    }
);

const UserModel = model("User", userSchema);

export default UserModel;
