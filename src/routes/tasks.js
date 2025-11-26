import express from "express";
import {
  createTask,
  getAllTasks,
  updateTasks,
  deleteTasks,
} from "../controllers/tasks.controller.js";

// Conexión al controlador de Tareas

const route = express.Router();

route.post("/", createTask);
route.get("/", getAllTasks);
route.put("/:id", updateTasks)
route.delete("/:id", deleteTasks)

export default route;