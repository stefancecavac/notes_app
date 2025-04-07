import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";

import notesRouter from "./routes/notesRoutes";
import authRouter from "./routes/AuthRoute";
import { errroHandler } from "./middleware/errorHandler";

const app = express();

app.use(express.json());
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/notes", notesRouter);

app.use(errroHandler);

app.listen(process.env.PORT, () => console.log(`Server has started on port ${process.env.PORT}`));
