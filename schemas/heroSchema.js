import { Schema } from "mongoose";

const heroSchema = new Schema({
    imgUrl: {
        type: String,
        default: "https://nextui.org/images/fruit-8.jpeg",
        maxLength: 510,
        match: [
            /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/,
            "must be a valid URL",
        ],
    },
    title: { type: String, default: "Add a title here", maxLength: 100 },
    text: {
        type: String,
        default: "And a bit of descriptive text here...",
        maxLength: 255,
    },
    button: { type: String, default: "Click Me", maxLength: 100 },
});

export default heroSchema;
