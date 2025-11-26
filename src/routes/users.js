import express from "express";
import {
  getAllUsers,
  updateUser,
  deleteUser,
} from "../controllers/users.controller.js";

// Conexión al controlador de Usuarios

const route = express.Router();

route.get("/", getAllUsers);
route.put("/:id", updateUser)
route.delete("/:id", deleteUser)

export default route;