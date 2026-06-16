import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import { createToken } from "../services/auth.js";

const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ["USER", "ADMIN"],
        },
    },
    { timestamps: true },
);

UserSchema.pre("save", async function () {
    const user = this;
    if (!user.isModified("password")) return;

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);

    this.password = hashedPassword;
});

//=== === === ===[This is like a class function lol fuck me in my ass motherfucker]=== === === ===
UserSchema.static("checkPswdCreateToken", async function (username, password) {
    const user = await this.findOne({ username });
    if (!user) throw new Error("User not found!");

    const hashedPswd = user.password;
    const isMatch = await bcrypt.compare(password, hashedPswd);
    const userInfo = {
        _id: user._id,
        username: user.username,
    };
    console.log(userInfo);
    if (isMatch) {
        const token = createToken(user);
        return { token, userInfo };
    } else throw new Error("You entered the wrong password");
});

export const User = model("user", UserSchema);
