import express from "express";
import { addTodoInModule, checkTodoModule, createToDoModule, deleteOneTodo } from "../../controllers/modulesControllers/ToDoModuleController";

const router = express.Router();

router.post("/", createToDoModule);
router.post("/addTodo", addTodoInModule);
router.put("/check", checkTodoModule);
router.delete("/delete", deleteOneTodo);

export default router;
