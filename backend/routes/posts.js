import express from "express";
import { Blog } from "../models/blog.js";

export const router = express.Router();

//=== === === === === === WRITE A BLOG === === === === === ===
router.post("/", async (req, res) => {
    try {
        const { title, content, authorId } = req.body;
        console.log(req.body);
        const newBlog = await Blog.create({
            title: title,
            content: content,
            author: authorId,
        });

        console.log("New blog posted:", newBlog);
        return res.status(201).json({ message: "created blog", blog: newBlog });
    } catch (err) {
        console.log(err, " is my new blog error");
        return res.status(400).json({ error: err });
    }
});

//=== === === === === === === GET ALL POSTS === === === === === === ===
router.get("/", async (req, res) => {
    try {
        const blogs = await Blog.find()
            .populate("author", "username")
            .sort({ createdAt: -1 });

        return res.status(200).json(blogs);
    } catch (err) {
        console.log(err, " is my homepage error");
        return res.status(500).json({ error: err });
    }
});

//=== === === === === === GET INDIVIDUAL POST === === === === === ===
router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;

        const blog = await Blog.findById(id).populate("author", "username");

        console.log(blog);
        if (!blog) {
            console.log("Blog not found");
            return res.status(404).json({ error: "Blog not found" });
        }

        return res.status(200).json(blog);
    } catch (err) {
        console.log(err, "is my blogview error");
        return res.status(500).json({ error: err });
    }
});
