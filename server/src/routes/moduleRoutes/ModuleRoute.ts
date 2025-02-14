import express from "express";
import { deleteModule, updateModuleOrder } from "../../controllers/modulesControllers/ModuleController";
import textModuleRouter from "../moduleRoutes/TextModuleRoute";
import imageModuleRouter from "../moduleRoutes/ImageModuleRoute";

const router = express.Router();

router.put("/update-module-order", updateModuleOrder);
router.delete("/delete-module", deleteModule);

router.use("/text-module", textModuleRouter);
router.use("/image-module", imageModuleRouter);

export default router;
