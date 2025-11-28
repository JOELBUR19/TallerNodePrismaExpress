import express from "express";
import bcrypt from "bcryptjs"; // o bcrypt
import jwt from "jsonwebtoken";
import prisma from "../prismaClient.js";

const router = express.Router();

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Buscar usuario
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) return res.status(400).json({ error: "Email o contraseña incorrectos" });

        // 2. Comparar contraseña
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return res.status(400).json({ error: "Email o contraseña incorrectos" });

        // 3. Crear token
        const token = jwt.sign(
            { sub: user.id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        // 4. Responder con token
        res.json({ token });

    } catch (error) {
        res.status(500).json({ error: "Error interno" });
    }
});

export default router;
