import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import 'dotenv/config';
import helmet from "helmet";
import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/post.js";
import commentRoutes from "./routes/comment.js";
import reactionRoutes from "./routes/reaction.js";
import userRoutes from "./routes/user.js";
import categoryRoutes from "./routes/category.js";

dotenv.config();

const app = express();


app.use(helmet());
app.use(express.json());
app.use(cookieParser());


app.use(
  cors({
    origin: [
      "https://blogify-7752.vercel.app",
      "http://localhost:5173",
      process.env.FRONTEND_URL,
    ].filter(Boolean),
    credentials: true,
  })
);


app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/posts", commentRoutes);
app.use("/api/posts", reactionRoutes);
app.use("/api/users", userRoutes);
app.use("/api", categoryRoutes);


app.get("/", (req, res) => {
  res.send("Backend running ✅");
});

app.get("/ping", (req, res) => {
  res.send("Server is running .. SUCCESSFULLY");
});


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
