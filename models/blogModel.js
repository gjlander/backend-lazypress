import { Schema, model } from "mongoose";
import heroSchema from "../schemas/heroSchema.js";
import blogPageSchema from "../schemas/blogPageSchema.js";

const blogSchema = new Schema({
    pages: {
        home: {
            navBar: [String],
            hero: [heroSchema],
            blogPages: [blogPageSchema],
        },
    },
    dashboard: {
        deployed: {
            type: Boolean,
            default: false,
        },
        siteUrl: String,
        previewUrl: String,
    },
    //updated to reflect clerk user authentication in place
    clerkUser: {
        type: Schema.Types.ObjectId,
        ref: "ClerkUser",
        required: true,
    },
    clerkUserId: {
        type: String,
        required: true,
    },
});

export default model("Blog", blogSchema);
