import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import "./util/CronRecycleBinDeletion";

import { PrismaClient } from "@prisma/client";

dotenv.config();

const app = express();
app.use(express.json({ limit: "10mb" }));

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));
app.use(cookieParser());

import authRouter from "./routes/AuthRoute";
import noteRouter from "./routes/NoteRoute";
import tagRouter from "./routes/TagRoute";
import { ErrorHandler } from "./middleware/ErrorHandlerMiddleware";

app.use("/api/auth", authRouter);
app.use("/api/notes", noteRouter);
app.use("/api/tags", tagRouter);

app.use(ErrorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server has started on port ${process.env.PORT}`);
});

export const client = new PrismaClient();
