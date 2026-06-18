import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { router as userRouter } from "./routes/user.js";
import { router as postsRouter } from "./routes/posts.js";
import { connectMongoDb } from "./dbconnect.js";
import { checkCookie } from "./middlewares/auth.js";

const app = express();

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    }),
);
app.use(express.json());
app.use(cookieParser());
app.use(checkCookie("token"));

app.use("/api/users", userRouter);
app.use("/api/posts", postsRouter);

connectMongoDb()
    .then(console.log("MongoDB connected!"))
    .catch((err) => console.log("Couldn't connect:" + err));

const PORT = 8008;
app.listen(PORT, () => console.log(`Server started at PORT: ${PORT} !`));
