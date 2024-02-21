import { Schema } from "mongoose";
import heroSchema from "./heroSchema.js";
import cardSchema from "./cardSchema.js";
import navBarSchema from "./navBarSchema.js";
import footerSchema from "./footerSchema.js";

const previewSchema = new Schema(
    {
        pages: {
            home: {
                navBar: [navBarSchema],
                hero: [heroSchema],
                cards: [cardSchema],
                footer: [footerSchema],
            },
        },
        dashboard: {
            blogTitle: {
                type: String,
                default: "Preview Page",
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

export default previewSchema;
