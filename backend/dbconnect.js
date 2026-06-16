import mongoose from "mongoose";

const mongoURI =
    "mongodb://admin:qwerty@localhost:27017/blog_db?authSource=admin";
export function connectMongoDb() {
    return mongoose.connect(mongoURI);
}
