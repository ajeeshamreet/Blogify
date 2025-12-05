import express from "express";
import { createComment, getComments, deleteComment, updateComment } from "../controllers/comment.controller.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

router.post("/:postId/comments", requireAuth, createComment);
router.get("/:postId/comments", getComments);
router.patch("/comments/:id", requireAuth, updateComment);
router.delete("/comments/:id", requireAuth, deleteComment);

export default router;
