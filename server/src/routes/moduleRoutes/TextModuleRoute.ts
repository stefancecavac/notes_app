import express from "express";

const router = express.Router();

import { createTextModule, updateTextModule } from "../../controllers/modulesControllers/TextModuleController";

router.post("/", createTextModule);
router.put("/update", updateTextModule);

export default router;
