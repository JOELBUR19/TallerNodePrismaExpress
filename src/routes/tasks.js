import express from "express";
import {
  createTask,
  getAllTasks,
  updateTasks,
  deleteTasks,
} from "../controllers/tasks.controller.js";

import { authMiddleware } from "../middlewares/authMiddleware.js"; // Importe del middleware para proteger las rutas de Tasks

const route = express.Router();
route.use(authMiddleware); // Aplicar el middleware de autenticación a todas las rutas de Tasks
route.post("/", createTask);
route.get("/", getAllTasks);
route.put("/:id", updateTasks);
route.delete("/:id", deleteTasks);

export default route;
