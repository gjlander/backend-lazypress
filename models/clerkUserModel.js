import mongoose from "mongoose";
import previewSchema from "../schemas/previewSchema.js";

const clerkUserSchema = new mongoose.Schema(
    {
        clerkUserId: { type: String, unique: true, required: true },
        firstName: String,
        lastName: String,
        username: String,
        previewPage: previewSchema,
    },
    { timestamps: true }
);

const ClerkUser = mongoose.model("ClerkUser", clerkUserSchema);

export default ClerkUser;
