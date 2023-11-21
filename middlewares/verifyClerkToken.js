import Cookies from "cookies";
import jwt from "jsonwebtoken";

export default async function verifyClerkToken(req, res) {
    const publicKey = process.env.CLERK_PEM_PUBLIC_KEY;
    const cookies = new Cookies(req, res);
    const sessToken = cookies.get("__session");
    const token = req.headers.authorization;
    if (sessToken === undefined && token === undefined) {
        res.status(401).json({ error: "not signed in" });
        return;
    }
    try {
        let decoded = "";
        if (token) {
            decoded = jwt.verify(token, publicKey);
            res.status(200).json({ sessToken: decoded });
            return;
        } else {
            decoded = jwt.verify(sessToken, publicKey);
            res.status(200).json({ sessToken: decoded });
            return;
        }
    } catch (error) {
        res.status(400).json({
            error: "Invalid Token",
        });
        return;
    }
}
