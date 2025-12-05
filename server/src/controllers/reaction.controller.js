import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const toggleLike = async (req, res) => {
    try {
        const { postId } = req.params;
        const userId = req.user.id;

        const existingLike = await prisma.like.findUnique({
            where: {
                userId_postId: {
                    userId,
                    postId,
                },
            },
        });

        if (existingLike) {
            await prisma.like.delete({
                where: { id: existingLike.id },
            });
            return res.json({ message: "Unliked", liked: false });
        } else {
            await prisma.like.create({
                data: {
                    userId,
                    postId,
                },
            });
            return res.json({ message: "Liked", liked: true });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to toggle like" });
    }
};

export const toggleBookmark = async (req, res) => {
    try {
        const { postId } = req.params;
        const userId = req.user.id;

        const existingBookmark = await prisma.bookmark.findUnique({
            where: {
                userId_postId: {
                    userId,
                    postId,
                },
            },
        });

        if (existingBookmark) {
            await prisma.bookmark.delete({
                where: { id: existingBookmark.id },
            });
            return res.json({ message: "Unbookmarked", bookmarked: false });
        } else {
            await prisma.bookmark.create({
                data: {
                    userId,
                    postId,
                },
            });
            return res.json({ message: "Bookmarked", bookmarked: true });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to toggle bookmark" });
    }
};
