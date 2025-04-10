import express from "express";
import {
  createModuleController,
  deleteModuleController,
  updateModuleController,
  updateModuleOrderController,
} from "../controllers/modulesController";

const router = express.Router();

router.post("/", createModuleController);
router.put("/", updateModuleController);
router.delete("/", deleteModuleController);
router.put("/reorder", updateModuleOrderController);

export default router;
