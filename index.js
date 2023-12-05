import express from "express";
import cors from "cors";
import "./db/mongooseClient.js";
import userRouter from "./routes/userRoutes.js";
import blogRouter from "./routes/blogRoutes.js";
import recipeRouter from "./routes/recipeRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";
import { clerkWebhook, getClerkUsers } from "./controllers/clerkControllers.js";
import bodyParser from "body-parser";

import stripeModule from "stripe";

const stripe = stripeModule(process.env.SECRET_KEY);

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

app.use("/recipes", recipeRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Listening on port http://localhost:${port}`);
});

// checkout with stripe
app.post(
  "/api/create-checkout-session",
  cors({
    exposedHeaders: "Authorization",
    allowedHeaders: ["Access-Control-Allow-Origin"],
  }),
  async (req, res) => {
    try {
      const { price } = req.body;
      // console.log(price);
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "eur",
              product_data: {
                name: "Your order is ready",
              },
              unit_amount: price * 100,
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: process.env.PROD
          ? `${process.env.PROD_CLIENT_URL}/success`
          : `${process.env.DEV_CLIENT_URL}/success`,
        cancel_url: process.env.PROD
          ? `${process.env.PROD_CLIENT_URL}/cancel`
          : `${process.env.DEV_CLIENT_URL}/cancel`,
      });
      res.json({ id: session.id });
    } catch (error) {
      console.error("Error creating checkout session:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);
