import express from "express";
import { User } from "../models/user.js";
import { createToken, verifyToken } from "../services/auth.js";

export const router = express.Router();

//=============================SIGN-THE-FUCK-UP====================================
router.post("/signup", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        console.log(req.body);
        const newUser = await User.create({
            username: username,
            email: email,
            password: password,
        });

        const token = createToken(newUser);
        res.cookie("token", token, {
            path: "/",
            httpOnly: true,
            secure: false,
            sameSite: "lax",
        });

        delete newUser.password;
        console.log("New user info:", newUser);

        return res.status(201).json({ message: "created", user: newUser });
    } catch (err) {
        console.log(err, " is my new sex disease");
        return res.status(400).json({ error: err });
    }
});

//================================LOG-THE-FUCK-IN============================
router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const { token, userInfo } = await User.checkPswdCreateToken(
            username,
            password,
        );
        res.cookie("token", token, {
            path: "/",
            httpOnly: true,
            secure: false,
            sameSite: "lax",
        });
        if (userInfo) console.log("Login user info:", userInfo);
        return res.status(200).json({ user: userInfo, message: "logged in" });
    } catch (err) {
        console.log(err, " is my login sex disease");
        return res.status(401).json({ error: err });
    }
});

router.post("/logout", async (req, res) => {
    res.clearCookie("token", {
        path: "/",
        httpOnly: true,
        secure: false,
        sameSite: "lax",
    });

    return res.status(200).json({ message: "Suxessfully logged out" });
});

//==============================JUST-FUCKING-CHECK-ME-OUT==============================
router.get("/me", async (req, res) => {
    const token = req.cookies.token;
    if (!token)
        return res.status(401).json({ error: "Not Logged In Fuck you" });

    try {
        const userInfo = verifyToken(token);
        return res.status(200).json({
            _id: userInfo._id,
            username: userInfo.username,
        });
    } catch (err) {
        return res.status(401).json({ error: "Invalid Token Fuck you twice" });
    }
});
