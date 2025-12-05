import { PrismaClient } from "@prisma/client";
import slugify from "slugify";

const prisma = new PrismaClient();

const calculateReadingTime = (content) => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
};

export const createPost = async (req, res) => {
    try {
        const { title, content, excerpt, coverImage, categories, tags, published } = req.body;
        const authorId = req.user.id;

        if (!title || !content) {
            return res.status(400).json({ message: "Title and content are required" });
        }

        let slug = slugify(title, { lower: true, strict: true });

        
        let existingSlug = await prisma.post.findUnique({ where: { slug } });
        let counter = 1;
        while (existingSlug) {
            slug = `${slugify(title, { lower: true, strict: true })}-${counter}`;
            existingSlug = await prisma.post.findUnique({ where: { slug } });
            counter++;
        }

        const readingTime = calculateReadingTime(content);

        const post = await prisma.post.create({
            data: {
                title,
                slug,
                content,
                excerpt,
                coverImage,
                published: published || false,
                readingTime,
                authorId,
                categories: {
                    connectOrCreate: categories?.map((cat) => ({
                        where: { name: cat },
                        create: { name: cat },
                    })),
                },
                tags: {
                    connectOrCreate: tags?.map((tag) => ({
                        where: { name: tag },
                        create: { name: tag },
                    })),
                },
            },
            include: {
                author: { select: { id: true, username: true, role: true } },
                categories: true,
                tags: true,
            },
        });

        res.status(201).json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to create post" });
    }
};

export const getPosts = async (req, res) => {
    try {
        const { page = 1, limit = 10, category, tag, search } = req.query;
        const skip = (page - 1) * limit;

        const where = {
            published: true,
        };

        if (category) {
            where.categories = { some: { name: category } };
        }

        if (tag) {
            where.tags = { some: { name: tag } };
        }

        if (search) {
            where.OR = [
                { title: { contains: search } },
                { content: { contains: search } },
            ];
        }

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

export const getPostBySlug = async (req, res) => {
    try {
        const { slug } = req.params;

        const post = await prisma.post.findUnique({
            where: { slug },
            include: {
                author: { select: { id: true, username: true, role: true } },
                categories: true,
                tags: true,
                _count: { select: { comments: true, likes: true } },
            },
        });

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        res.json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch post" });
    }
};

export const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content, excerpt, coverImage, published, categories, tags } = req.body;
        const userId = req.user.id;

        const post = await prisma.post.findUnique({ where: { id } });

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        
        
        const user = await prisma.user.findUnique({ where: { id: userId } });

        if (post.authorId !== userId && user.role !== "ADMIN" && user.role !== "EDITOR") {
            return res.status(403).json({ message: "Forbidden" });
        }

        const readingTime = content ? calculateReadingTime(content) : post.readingTime;

        const updatedPost = await prisma.post.update({
            where: { id },
            data: {
                title,
                content,
                excerpt,
                coverImage,
                published,
                readingTime,
                categories: categories ? {
                    set: [], 
                    connectOrCreate: categories.map((cat) => ({
                        where: { name: cat },
                        create: { name: cat },
                    })),
                } : undefined,
                tags: tags ? {
                    set: [],
                    connectOrCreate: tags.map((tag) => ({
                        where: { name: tag },
                        create: { name: tag },
                    })),
                } : undefined,
            },
        });

        res.json(updatedPost);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to update post" });
    }
};

export const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const post = await prisma.post.findUnique({ where: { id } });

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        const user = await prisma.user.findUnique({ where: { id: userId } });

        if (post.authorId !== userId && user.role !== "ADMIN") {
            return res.status(403).json({ message: "Forbidden" });
        }

        await prisma.post.delete({ where: { id } });

        res.json({ message: "Post deleted" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to delete post" });
    }
};
