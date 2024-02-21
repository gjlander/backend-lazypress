import { Schema } from "mongoose";

const footerSchema = new Schema({
    footerItem: { type: String, default: "You can customize the footer too." },
    href: String,
});

export default footerSchema;
