import express from "express";

const router = express.Router();
import {
  getAllNotes,
  getSingleNote,
  createTextNote,
  updateNote,
  SearchNotes,
  duplicateNote,
  getGraphNotes,
  moveNote,
} from "../controllers/NoteController";
import authenticate from "../middleware/authentication";

import favouriteNoteRouter from "./FavouriteNoteRoute";
import recycleBinNoteRouter from "../routes/RecycleBinNoteRoute";

// modules
import moduleRouter from "./moduleRoutes/ModuleRoute";

router.use(authenticate);
router.use("/favourite", favouriteNoteRouter);
router.use("/recycle-bin", recycleBinNoteRouter);
router.use("/modules", moduleRouter);
router.get("/", getAllNotes);
router.get("/graph", getGraphNotes);
router.get("/search", SearchNotes);
router.get("/:noteId", getSingleNote);
router.post("/", createTextNote);
router.post("/duplicate", duplicateNote);
router.put("/move", moveNote);
router.put("/:noteId", updateNote);

export default router;
