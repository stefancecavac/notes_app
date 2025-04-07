import express from "express";
import {
  createNotecontroller,
  getAllNotesController,
  getAllNotesInTreeViewController,
  getSingleNoteController,
  moveNoteController,
  updateNoteController,
} from "../controllers/notesControllers";
import { validate } from "../middleware/validation";
import { notesTableSchema } from "../db/schema/notes";
import blockRouter from "./blockRoutes";
import authenticate from "../middleware/authentication";

import favouriteRouter from "./favouriteNoteRoute";

const router = express.Router();

router.use("/block", blockRouter);

router.use(authenticate);

router.use("/favourite", favouriteRouter);
router.get("/", getAllNotesInTreeViewController);
router.get("/all", getAllNotesController);

router.get("/:id", validate({ params: notesTableSchema.pick({ id: true }) }), getSingleNoteController);
router.post("/", createNotecontroller);
router.put("/move", moveNoteController);

router.put("/:noteId", updateNoteController);

export default router;
