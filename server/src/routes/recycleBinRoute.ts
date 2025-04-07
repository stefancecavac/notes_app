import express from "express";

import authenticate from "../middleware/authentication";
import {
  deleteNoteFromRecycleBinController,
  getAllNotesFromRecycleBinController,
  moveToRecycleBinController,
  restoreFromRecycleBinController,
} from "../controllers/RecycleBinNoteController";

const router = express.Router();

router.use(authenticate);
router.get("/", getAllNotesFromRecycleBinController);
router.put("/", moveToRecycleBinController);
router.put("/restore", restoreFromRecycleBinController);
router.delete("/", deleteNoteFromRecycleBinController);

export default router;
