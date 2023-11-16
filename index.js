import express from "express";
import cors from "cors";
import "./db/mongooseClient.js";
import userRouter from "./routes/userRoutes.js";
import blogRouter from "./routes/blogRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";

import { clerkWebhook, getClerkUsers } from "./controllers/clerkControllers.js";
import bodyParser from "body-parser";

const app = express();
const port = process.env.PORT || 24601;
app.use(cors());

// app.use(express.json());

app.get("/", (req, res) => res.json(`You've made it to LazyPress's backend`));

app.route("/api/webhook")
    .get(getClerkUsers)
    .post(bodyParser.raw({ type: "application/json" }), clerkWebhook);

app.use("/users", userRouter);

app.use("/blogs", blogRouter);

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Listening on port http://localhost:${port}`);
});
