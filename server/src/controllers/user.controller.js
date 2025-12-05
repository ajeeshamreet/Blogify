import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getUserProfile = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                username: true,
                email: true,
                role: true,
                createdAt: true,
                _count: {
                    select: {
                        posts: true,
                        comments: true,
                        likes: true,
                    },
                },
            },
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch user profile" });
    }
};

export const getUserPosts = async (req, res) => {
    try {
        const { id } = req.params;
        const { page = 1, limit = 10 } = req.query;
        const skip = (page - 1) * limit;

        const where = { authorId: id, published: true };

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
        res.status(500).json({ message: "Failed to fetch user posts" });
    }
};

export const getMyPosts = async (req, res) => {
    try {
        const userId = req.user.id;
        const { page = 1, limit = 10 } = req.query;
        const skip = (page - 1) * limit;

        const where = { authorId: userId };

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
        res.status(500).json({ message: "Failed to fetch posts" });
    }
};

export const getMyBookmarks = async (req, res) => {
    try {
        const userId = req.user.id;
        const { page = 1, limit = 10 } = req.query;
        const skip = (page - 1) * limit;

        const bookmarks = await prisma.bookmark.findMany({
            where: { userId },
            skip: parseInt(skip),
            take: parseInt(limit),
            orderBy: { createdAt: "desc" },
            include: {
                post: {
                    include: {
                        author: { select: { id: true, username: true, role: true } },
                        categories: true,
                        tags: true,
                        _count: { select: { comments: true, likes: true } },
                    },
                },
            },
        });

        const total = await prisma.bookmark.count({ where: { userId } });

        res.json({
            bookmarks: bookmarks.map(b => b.post),
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                totalPages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch bookmarks" });
    }
};
    