import express from "express";
import {
  createNotecontroller,
  duplicateNoteController,
  getAllNotesController,
  getAllNotesInTreeViewController,
  getSingleNoteController,
  moveNoteController,
  SearchNotesController,
  updateNoteController,
} from "../controllers/notesControllers";
import { validate } from "../middleware/validation";
import { notesTableSchema } from "../db/schema/notes";
import authenticate from "../middleware/authentication";

import favouriteRouter from "./favouriteNoteRoute";
import recycleBinRouter from "./recycleBinRoute";
import modulesRouter from "./moduleRoutes";

const router = express.Router();

router.use(authenticate);

router.use("/modules", modulesRouter);
router.use("/favourite", favouriteRouter);
router.use("/recycleBin", recycleBinRouter);

router.get("/", getAllNotesInTreeViewController);
router.get("/all", getAllNotesController);
router.get("/search", SearchNotesController);

router.get("/:id", validate({ params: notesTableSchema.pick({ id: true }) }), getSingleNoteController);
router.post("/", createNotecontroller);
router.post("/duplicate", duplicateNoteController);

router.put("/move", moveNoteController);

router.put("/:noteId", updateNoteController);

export default router;
