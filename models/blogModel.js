import { Schema, model } from "mongoose";
import heroSchema from "../schemas/heroSchema.js";
import blogPageSchema from "../schemas/blogPageSchema.js";
import cardSchema from "../schemas/cardSchema.js";
import navBarSchema from "../schemas/navBarSchema.js";
import footerSchema from "../schemas/footerSchema.js";

const blogSchema = new Schema(
    {
        pages: {
            home: {
                navBar: [navBarSchema],
                hero: [heroSchema],
                // blogPages: [blogPageSchema],
                cards: [cardSchema],
                footer: [footerSchema],
            },
        },
        dashboard: {
            blogTitle: {
                type: String,
                default: "Untitled Page",
            },
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
    },
    { timestamps: true }
);

export default model("Blog", blogSchema);
