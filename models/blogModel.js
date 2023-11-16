import { Schema, model } from "mongoose";
import cardSchema from "./cardSchema.js";

const blogSchema = new Schema({
    pages: {
        home: {
            navBar: [String],
            hero: {
                imgUrl: {
                    type: String,
                    match: [
                        /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/,
                        "must be a valid URL",
                    ],
                },
                title: String,
            },
            cards: [cardSchema],
        },
    },
    // deployed: {
    //     type: Boolean,
    //     default: false,
    //     deployUrl: {
    //         type: String,
    //         match: [
    //             /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/,
    //             "must be a valid URL",
    //         ],
    //     },
    // },
    //updated to reflect clerk user authentication in place
    clerkUser: {
        type: Schema.Types.ObjectId,
        ref: "ClerkUser",
        required: true,
    },
});

export default model("Blog", blogSchema);
