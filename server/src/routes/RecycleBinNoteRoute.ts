import express from "express";

const router = express.Router();

import {
  moveToRecycleBin,
  getAllNotesFromRecycleBin,
  restoreFromRecycleBin,
  deleteNoteFromRecycleBin,
} from "../controllers/RecycleBinNoteController";
import authenticate from "../middleware/authentication";

router.use(authenticate);
router.get("/", getAllNotesFromRecycleBin);
router.put("/move-to-recycle-bin", moveToRecycleBin);
router.put("/restore-from-recycle-bin", restoreFromRecycleBin);
router.delete("/", deleteNoteFromRecycleBin);

export default router;
