import { Schema } from "mongoose";

const navBarSchema = new Schema({
    menuItem: String,
    href: String,
});

export default navBarSchema;
