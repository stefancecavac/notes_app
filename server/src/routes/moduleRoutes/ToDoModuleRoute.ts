import express from "express";
import { addTodoInModule, checkTodoModule, createToDoModule } from "../../controllers/modulesControllers/ToDoModuleController";

const router = express.Router();

router.post("/", createToDoModule);
router.post("/addTodo", addTodoInModule);
router.put("/check", checkTodoModule);

export default router;
