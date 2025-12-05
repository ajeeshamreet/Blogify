import express from "express";
import { toggleLike, toggleBookmark } from "../controllers/reaction.controller.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

router.post("/:postId/like", requireAuth, toggleLike);
router.post("/:postId/bookmark", requireAuth, toggleBookmark);

export default router;
