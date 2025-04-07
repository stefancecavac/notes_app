import express from "express";
import { validate } from "../middleware/validation";
import { createModuleController, updateModuleController } from "../controllers/modulesController";
import { modulesTableSchema } from "../db/schema/modules";

const router = express.Router();

router.post("/", createModuleController);
router.put("/", updateModuleController);

export default router;
