import ClerkUser from "../models/clerkUserModel.js";
import { Webhook } from "svix";

const clerkWebhook = async (req, res) => {
    try {
        const payloadString = req.body.toString();
        const svixHeaders = req.headers;

        const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET_KEY);
        const evt = wh.verify(payloadString, svixHeaders);
        const { id, ...attributes } = evt.data;
        // Handle the webhooks
        const eventType = evt.type;
        console.log("webHook event type:", eventType);
        if (eventType === "user.created") {
            console.log(`User ${id} was ${eventType}`);

            const firstName = attributes.first_name;
            const lastName = attributes.last_name;

            const user = new ClerkUser({
                clerkUserId: id,
                firstName: firstName,
                lastName: lastName,
            });

            await user.save();
            console.log("User saved to database");
        }
        res.status(200).json({
            success: true,
            message: "Webhook received",
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message,
        });
    }
};

export { clerkWebhook };
