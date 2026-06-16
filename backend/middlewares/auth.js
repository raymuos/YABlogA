import { verifyToken } from "../services/auth.js";

export function checkCookie(cookiename) {
    return async (req, _, next) => {
        const tokenCookieValue = req.cookies[cookiename];
        if (!tokenCookieValue) return next();

        try {
            const userPayload = verifyToken(tokenCookieValue);
            req.user = userPayload;
        } catch (err) {
            console.log(err);
        }
        next();
    };
}
