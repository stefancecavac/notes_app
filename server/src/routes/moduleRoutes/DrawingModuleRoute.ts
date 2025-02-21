import express from "express";
import { createDrawingModule, updateDrawingModule } from "../../controllers/modulesControllers/DrrawingModuleController";

const router = express.Router();

router.post("/", createDrawingModule);
router.put("/update", updateDrawingModule);

export default router;
