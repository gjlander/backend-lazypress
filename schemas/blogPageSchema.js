import { Schema } from "mongoose";
// import cardSchema from "./cardSchema.js";
import ingListSchema from "./ingListSchema.js";

const blogPageSchema = new Schema({
    //card no longer used
    // card: cardSchema,
    title: { type: String, maxLength: 100 },
    category: String,
    region: String,
    ingList: [ingListSchema],
    steps: [String],
    text: {
        type: String,
        maxLength: 255,
        default: "Simply delicious",
    },
    button: {
        type: String,
        default: "To Recipe",
    },
    imgUrl: {
        type: String,
        maxLength: 510,
        match: [
            /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/,
            "must be a valid URL",
        ],
    },
});

export default blogPageSchema;
