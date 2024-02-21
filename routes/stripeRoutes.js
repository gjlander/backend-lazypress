import express from "express";
import cors from "cors";
import stripeModule from "stripe";

const stripe = stripeModule(process.env.SECRET_KEY);

const stripeRouter = express.Router();

stripeRouter.use(express.json());
const whitelist = ["http://localhost:5173", "https://lazypress.netlify.app"];
const corsOptions = {
    // origin: function (origin, callback) {
    //   if (whitelist.indexOf(origin) !== -1) {
    //     callback(null, true);
    //   } else {
    //     callback(new Error("Not allowed by CORS"));
    //   }
    // },
    origin: "*",
    exposedHeaders: "Authorization",
    allowedHeaders: ["Access-Control-Allow-Origin"],
    credentials: true,
};

stripeRouter.post(
    "/api/create-checkout-session",
    cors(corsOptions),
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

export default stripeRouter;
