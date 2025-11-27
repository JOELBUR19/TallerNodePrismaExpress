//importar los modulos
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import rateLimit from "express-rate-limit";
import passport from "./config/passport.js";
dotenv.config();

// Importar las rutas
import authRoutesRegister from "./controllers/register.js";
import authRoutesLogin from "./controllers/login.js";
import taskRoutes from "./routes/tasks.js";

const app = express();
const PORT = 3000;

// CORS (no hay frontend pero igual se deja para seguridad)
app.use(cors());

// Inicializar Passport
app.use(passport.initialize()); // Por qué usamos passport? lo usamos ya que viene predeterminado con funciones extra que tendriamos que programar en nuestro middlewere lo que podria hacer que este ultimo quede muy largo, además está estandarizado y tiene mas guias de ayuda

// Limitador para /auth/login
const authLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: "Demasiados intentos, intenta de nuevo ma' tarde. Gracia.",
});

app.use(express.json());
app.use("/auth/login", authLimiter);
app.use("/auth", authRoutesRegister);
app.use("/auth", authRoutesLogin);

// Ruta de tasks protegida gracias al passport que usamos
app.use("/tasks", passport.authenticate("jwt", { session: false }), taskRoutes);

app.get("/", (req, res) => {
  res.send("Api running");
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
