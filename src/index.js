//importar los modulos
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import rateLimit from "express-rate-limit";
dotenv.config();

// Importar las rutas
import authRoutesRegister from "./controllers/register.js";
import authRoutesLogin from "./controllers/login.js";
import taskRoutes from "./routes/tasks.js";

const app = express();
const PORT = 3000;

// En este proyecto no existe frontend, pero este sirve para darle seguridad a la web (en caso de tener un index.html) por lo que al no haber frontend nunca presentara errores con el CORS
app.use(cors());

// Limitador que limita los intento que puede hacer un usuario para iniciar sesión (5 intengos como maximo)
const authLimiter = rateLimit({
  windowMs: 60 * 1000, // Tiempo maximo de un minuto para reinicio
  max: 5,
  message: "Demasiados intentos, intenta de nuevo ma' tarde. Gracia.",
});

app.use(express.json());

// Rutas de autenticación para buscar usuarios y registrar usuarios en el sistema
app.use("/auth", authLimiter);
app.use("/tasks", taskRoutes);
app.use("/auth", authRoutesRegister);
app.use("/auth", authRoutesLogin);
app.use("/tasks", taskRoutes);

app.get("/", (req, res) => {
  res.send("Api running");
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
