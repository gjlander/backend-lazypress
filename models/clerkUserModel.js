import mongoose from "mongoose";

const clerkUserSchema = new mongoose.Schema(
    {
        clerkUserId: { type: String, unique: true, required: true },
        firstName: String,
        lastName: String,
    },
    { timestamps: true }
);

const ClerkUser = mongoose.model("clerkUser", clerkUserSchema);

export default ClerkUser;
