import jwt from "jsonwebtoken";
const secret = "67incel67lovesPcube67";

export function createToken(user) {
    const payload = {
        _id: user._id,
        username: user.username,
    };

    const token = jwt.sign(payload, secret);
    return token;
}

export function verifyToken(token) {
    const payload = jwt.verify(token, secret);
    return payload;
}
