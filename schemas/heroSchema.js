import { Schema } from "mongoose";

const heroSchema = new Schema({
    imgUrl: {
        type: String,
        maxLength: 510,
        match: [
            /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/,
            "must be a valid URL",
        ],
    },
    title: { type: String, maxLength: 100 },
    text: { type: String, maxLength: 255 },
    button: String,
});

export default heroSchema;
