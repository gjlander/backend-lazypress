import { Schema, model } from "mongoose";
import cardSchema from "./cardSchema";

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
    deployUrl: {
        type: String,
        // required: true,
        match: [
            /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/,
            "must be a valid URL",
        ],
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});

export default model("Blog", blogSchema);
