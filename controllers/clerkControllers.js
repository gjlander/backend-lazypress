import ErrorStatus from "../utils/errorStatus.js";
import ClerkUser from "../models/clerkUserModel.js";
import { Webhook } from "svix";

const getClerkUsers = async (req, res, next) => {
    try {
        const getClerkUsers = await ClerkUser.find();
        return res.json(getClerkUsers);
    } catch (error) {
        next(error);
    }
};

const clerkWebhook = async (req, res) => {
    try {
        const payloadString = req.body.toString();
        const svixHeaders = req.headers;

        const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET_KEY);
        const evt = wh.verify(payloadString, svixHeaders);
        const { id, ...info } = evt.data;
        // Handle the webhooks
        const eventType = evt.type;
        console.log("webHook event type:", eventType);
        // console.log(info);
        if (eventType === "user.created") {
            console.log(`User ${id} was ${eventType}`);

            const firstName = info.first_name;
            const lastName = info.last_name;
            const username = info.username;

            await ClerkUser.create({
                clerkUserId: id,
                firstName,
                lastName,
                username,
            });
            console.log(`${username} saved to database`);
        }
        if (eventType === "user.updated") {
            console.log(`User ${id} was ${eventType}`);

            const firstName = info.first_name;
            const lastName = info.last_name;
            const username = info.username;

            await ClerkUser.findOneAndUpdate(
                { clerkUserId: id },
                {
                    firstName,
                    lastName,
                    username,
                }
            );
            console.log(`${username} updated successfully`);
        }
        if (eventType === "user.deleted") {
            console.log(`User ${id} was ${eventType}`);

            await ClerkUser.findOneAndDelete({ clerkUserId: id });
            console.log(`User deleted successfully`);
        }
        return res.status(200).json({
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

export { clerkWebhook, getClerkUsers };
