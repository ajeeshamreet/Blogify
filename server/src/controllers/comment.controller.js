import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createComment = async (req, res) => {
    try {
        const { postId } = req.params;
        const { content, parentId } = req.body;
        
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: "You must be logged in to comment" });
        }
        
        const authorId = req.user.id;

        if (!content || !content.trim()) {
            return res.status(400).json({ message: "Content is required" });
        }

        const comment = await prisma.comment.create({
            data: {
                content: content.trim(),
                postId,
                authorId,
                parentId: parentId || null,
            },
            include: {
                author: { select: { id: true, username: true, role: true } },
            },
        });

        res.status(201).json(comment);
    } catch (error) {
        console.error('Create comment error:', error);
        res.status(500).json({ message: "Failed to create comment", error: error.message });
    }
};

export const getComments = async (req, res) => {
    try {
        const { postId } = req.params;
        const { page = 1, limit = 20 } = req.query;
        const skip = (page - 1) * limit;

        const where = { postId };

        const comments = await prisma.comment.findMany({
            where,
            skip: parseInt(skip),
            take: parseInt(limit),
            orderBy: { createdAt: "asc" },
            include: {
                author: { select: { id: true, username: true } },
                children: {
                    include: {
                        author: { select: { id: true, username: true } },
                    },
                },
            },
        });

        const total = await prisma.comment.count({ where });

        res.json({
            comments,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                totalPages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch comments" });
    }
};

export const deleteComment = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const comment = await prisma.comment.findUnique({ where: { id } });

        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        const user = await prisma.user.findUnique({ where: { id: userId } });

        
        if (comment.authorId !== userId && user.role !== "ADMIN" && user.role !== "EDITOR") {
            return res.status(403).json({ message: "Forbidden" });
        }

        await prisma.comment.delete({ where: { id } });

        res.json({ message: "Comment deleted" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to delete comment" });
    }
};

export const updateComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { content } = req.body;
        const userId = req.user.id;

        const comment = await prisma.comment.findUnique({ where: { id } });

        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        if (comment.authorId !== userId) {
            return res.status(403).json({ message: "Forbidden" });
        }

        const updatedComment = await prisma.comment.update({
            where: { id },
            data: { content },
            include: {
                author: { select: { id: true, username: true } },
            },
        });

        res.json(updatedComment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to update comment" });
    }
};
