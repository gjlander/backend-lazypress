import { Schema } from "mongoose";

const cardSchema = new Schema({
    imgUrl: {
        type: String,
        default:
            "https://hips.hearstapps.com/hmg-prod/images/crepes-index-64347419e3c7a.jpg",
        maxLength: 510,
        match: [
            /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/,
            "must be a valid URL",
        ],
    },
    title: { type: String, default: "A delicious recipe here", maxLength: 100 },
    text: { type: String, default: "Simply delicious", maxLength: 255 },
    button: {
        type: String,
        default: "To Recipe",
    },
});

export default cardSchema;
