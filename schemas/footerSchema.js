import { Schema } from "mongoose";

const footerSchema = new Schema({
    footerItem: String,
    href: String,
});

export default footerSchema;
