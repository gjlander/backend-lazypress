import express from "express";
import cors from "cors";
import "./db/mongooseClient.js";
import userRouter from "./routes/userRoutes.js";
// import displayRouter from "./routes/displayRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();
const port = process.env.PORT || 24601;
app.use(cors({ exposedHeaders: "Authorization" }));

app.use(express.json());

app.get("/", (req, res) => res.json(`You've made it to LazyPress's backend`));

app.use("/users", userRouter);

// app.use("/display", displayRouter);

app.use(errorHandler);

app.listen(port, () => console.log(`Welcome ${port}`));
