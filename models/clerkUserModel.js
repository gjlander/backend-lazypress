import mongoose from "mongoose";

const clerkUserSchema = new mongoose.Schema(
    {
        clerkUserId: { type: String, unique: true, required: true },
        firstName: String,
        lastName: String,
        username: String,
    },
    { timestamps: true }
);

const ClerkUser = mongoose.model("ClerkUser", clerkUserSchema);

export default ClerkUser;
