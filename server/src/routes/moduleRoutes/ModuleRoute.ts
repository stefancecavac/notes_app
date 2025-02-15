import express from "express";
import { deleteModule, updateModuleOrder } from "../../controllers/modulesControllers/ModuleController";
import textModuleRouter from "../moduleRoutes/TextModuleRoute";
import imageModuleRouter from "../moduleRoutes/ImageModuleRoute";
import todoModuleRouter from "../moduleRoutes/ToDoModuleRoute";

const router = express.Router();

router.put("/update-module-order", updateModuleOrder);
router.delete("/delete-module", deleteModule);

router.use("/text-module", textModuleRouter);
router.use("/image-module", imageModuleRouter);
router.use("/todo-module", todoModuleRouter);

export default router;
