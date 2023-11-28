import express from "express";
import cors from "cors";
import "./db/mongooseClient.js";
import userRouter from "./routes/userRoutes.js";
import blogRouter from "./routes/blogRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";
import { clerkWebhook, getClerkUsers } from "./controllers/clerkControllers.js";
import bodyParser from "body-parser";

import stripeModule from "stripe";

// console.log(import.meta.env.SECRET_KEY);
const stripe = stripeModule(
  "sk_test_51OH34hKf4NKtRgVizbP7tsM9afuF9LK7NTuSveo3CERecdC90Z89uKXrSAOMZ1btRbUC9cPPKd9o6HpiFZWScQdL00D8NfKJyI"
  // import.meta.env.SECRET_KEY
);

const app = express();
const port = process.env.PORT || 24601;

app.use(express.json());
app.use(cors({ exposedHeaders: "Authorization" }));

app.get("/", (req, res) => res.json(`You've made it to LazyPress's backend`));

app
  .route("/clerk")
  .get(getClerkUsers)
  .post(bodyParser.raw({ type: "application/json" }), clerkWebhook);

app.use("/users", userRouter);

app.use("/blogs", blogRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Listening on port http://localhost:${port}`);
});

// checkout api
app.post("/api/create-checkout-session", async (req, res) => {
  const { price } = req.body;
  //
  //   const session = await stripe.checkout.sessions.create({
  //     payment_method_types: ["card"],
  //     line_items: price,
  //     mode: "payment",
  //     success_url: "http://localhost:3000/sucess",
  //     cancel_url: "http://localhost:3000/cancel",
  //   });
  //
  //   res.json({ id: session.id });
  //

  console.log(price);

  res.send("Received data successfully");
});
