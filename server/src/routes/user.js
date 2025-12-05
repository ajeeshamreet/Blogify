import express from "express";
import { getUserProfile, getUserPosts, getMyPosts, getMyBookmarks } from "../controllers/user.controller.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

router.get("/me/posts", requireAuth, getMyPosts);
router.get("/me/bookmarks", requireAuth, getMyBookmarks);
router.get("/:id", getUserProfile);
router.get("/:id/posts", getUserPosts);

export default router;
