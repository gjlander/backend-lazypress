import { Schema } from "mongoose";

const navBarSchema = new Schema({
    menuItem: { type: String, default: "Change Me" },
    href: String,
});

export default navBarSchema;
