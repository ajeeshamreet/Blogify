import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllCategories = async (req, res) => {
    try {
        const categories = await prisma.category.findMany({
            include: {
                _count: { select: { posts: true } },
            },
            orderBy: { name: "asc" },
        });

        res.json(categories);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch categories" });
    }
};

export const getPostsByCategory = async (req, res) => {
    try {
        const { name } = req.params;
        const { page = 1, limit = 10 } = req.query;
        const skip = (page - 1) * limit;

        const category = await prisma.category.findUnique({
            where: { name },
        });

        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        const where = {
            published: true,
            categories: { some: { name } },
        };

        const posts = await prisma.post.findMany({
            where,
            skip: parseInt(skip),
            take: parseInt(limit),
            orderBy: { createdAt: "desc" },
            include: {
                author: { select: { id: true, username: true, role: true } },
                categories: true,
                tags: true,
                _count: { select: { comments: true, likes: true } },
            },
        });

        const total = await prisma.post.count({ where });

        res.json({
            category,
            posts,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                totalPages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch posts by category" });
    }
};

export const getAllTags = async (req, res) => {
    try {
        const tags = await prisma.tag.findMany({
            include: {
                _count: { select: { posts: true } },
            },
            orderBy: { name: "asc" },
        });

        res.json(tags);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch tags" });
    }
};

export const getPostsByTag = async (req, res) => {
    try {
        const { name } = req.params;
        const { page = 1, limit = 10 } = req.query;
        const skip = (page - 1) * limit;

        const tag = await prisma.tag.findUnique({
            where: { name },
        });

        if (!tag) {
            return res.status(404).json({ message: "Tag not found" });
        }

        const where = {
            published: true,
            tags: { some: { name } },
        };

        const posts = await prisma.post.findMany({
            where,
            skip: parseInt(skip),
            take: parseInt(limit),
            orderBy: { createdAt: "desc" },
            include: {
                author: { select: { id: true, username: true, role: true } },
                categories: true,
                tags: true,
                _count: { select: { comments: true, likes: true } },
            },
        });

        const total = await prisma.post.count({ where });

        res.json({
            tag,
            posts,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                totalPages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch posts by tag" });
    }
};
