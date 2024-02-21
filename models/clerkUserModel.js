import mongoose from "mongoose";
import previewSchema from "../schemas/previewSchema.js";
import heroSchema from "../schemas/heroSchema.js";
import cardSchema from "../schemas/cardSchema.js";
import navBarSchema from "../schemas/navBarSchema.js";
import footerSchema from "../schemas/footerSchema.js";

const clerkUserSchema = new mongoose.Schema(
    {
        clerkUserId: { type: String, unique: true, required: true },
        firstName: String,
        lastName: String,
        username: String,
        previewPage: {
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
            // clerkUserId: {
            //     type: String,
            //     required: true,
            // },
        },
    },
    { timestamps: true }
);

const ClerkUser = mongoose.model("ClerkUser", clerkUserSchema);

export default ClerkUser;
