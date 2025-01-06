import express from "express";

const router = express.Router();

import { createTag, getAllTags, deleteTag } from "../controllers/TagController";
import authenticate from "../middleware/authentication";

router.use(authenticate);
router.get("/", getAllTags);
router.put("/:noteId", createTag);
router.delete("/:noteId", deleteTag);

export default router;
