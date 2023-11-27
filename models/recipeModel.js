import { Schema, model } from "mongoose";
import ingListSchema from "../schemas/ingListSchema.js";

const recipeSchema = new Schema({
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
    videoUrl: {
        type: String,
        maxLength: 510,
        match: [
            /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/,
            "must be a valid URL",
        ],
    },
    tags: [String],
    clerkUser: {
        type: Schema.Types.ObjectId,
        ref: "ClerkUser",
        required: true,
        default: "655f84b8e921f5d366aca193",
    },
    blog: {
        type: Schema.Types.ObjectId,
        ref: "Blog",
        required: true,
        default: "6564e5d24a1720b2b61ca4dc",
    },
    clerkUserId: {
        type: String,
        required: true,
        default: "user_2YaLOVB9glH3fMsNCh5Ua7dQap7",
    },
});

export default model("Recipe", recipeSchema);
