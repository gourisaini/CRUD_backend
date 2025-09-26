import express from "express";
import { isAuthenticated } from "../middleware/auth.js";
import {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
  toggleTodoStatus,
} from "../controllers/todoController.js";

const router = express.Router();

router.use(isAuthenticated);

router.get("/todo", getAllTodos);
router.post("/todo", createTodo);
router.get("/todo/:id", getTodoById);
router.put("/todo/:id", updateTodo);
router.delete("/todo/:id", deleteTodo);
router.patch("/todo/:id/toggle", toggleTodoStatus);

export default router;
