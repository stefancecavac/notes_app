import express from "express";
import { createImageModule, updateImageModule } from "../../controllers/modulesControllers/ImageModuleControler";

const router = express.Router();

router.post("/", createImageModule);
router.put("/update", updateImageModule);

export default router;
