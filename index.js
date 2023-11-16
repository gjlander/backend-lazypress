import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { clerkWebhook } from "./controllers/clerkControllers.js";
import bodyParser from "body-parser";

// Connect mongoose to database
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected to DB");
    })
    .catch((err) => console.log(err.message));

const app = express();

app.use(cors());

// Real code
app.route("/api/webhook").post(
    bodyParser.raw({ type: "application/json" }),
    clerkWebhook
);

const port = process.env.PORT || 24601;

app.listen(port, () => {
    console.log(`Listening on port http://localhost:${port}`);
});
