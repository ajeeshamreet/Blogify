import express from "express";
import { createPost, getPosts, getPostBySlug, updatePost, deletePost } from "../controllers/post.controller.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

router.post("/", requireAuth, createPost);
router.get("/", getPosts);
router.get("/:slug", getPostBySlug);
router.patch("/:id", requireAuth, updatePost);
router.delete("/:id", requireAuth, deletePost);

export default router;
