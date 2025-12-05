import express from "express";
import { getAllCategories, getPostsByCategory, getAllTags, getPostsByTag } from "../controllers/category.controller.js";

const router = express.Router();

router.get("/categories", getAllCategories);
router.get("/categories/:name/posts", getPostsByCategory);
router.get("/tags", getAllTags);
router.get("/tags/:name/posts", getPostsByTag);

export default router;
