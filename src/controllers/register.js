import express from "express";
import prisma from "../prismaClient.js";
import bcrypt from "bcryptjs";

const router = express.Router();
router.post("/register", async (req, res) => { // Registro de usuarios nuevos creados
  const { name, email, password } = req.body; 

  // Verificación de datos obligatorios para crear un registro 
  if (!name || !email || !password)
    return res.status(400).json({
      error: "Faltan datos por ingresar, ingrese su nombre, correo y contraseña"
    });

  const exists = await prisma.user.findUnique({ where: { email } });

  // Verificación de que un email no pueda ser repetido en varios registros
  if (exists)
    return res.status(409).json({
      error: "Email ya usado, ingrese un email diferente"
    });

  const hashed = await bcrypt.hash(password, 10); // Se hashea la contraseña para aumentar la seguridad del registro

  // Creación del usuario en el sistema
  const user = await prisma.user.create({
    data: { name, email, password: hashed },
  });

  res.status(201).json({
    message: "Registrado con exito",
    user: { id: user.id, name: user.name, email: user.email },
  });
});

export default router;
