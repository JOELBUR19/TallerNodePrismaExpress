import express from "express";
import dotenv from "dotenv";
dotenv.config();

// Importar rutas
import authRoutesRegister from "./controllers/register.js";
import authRoutesLogin from "./controllers/login.js";

const app = express();
const PORT = 3000;

app.use(express.json());

// Rutas de autenticación
app.use("/auth", authRoutesRegister);
app.use("/auth", authRoutesLogin);

app.get("/", (req, res) => {
  res.send("Api running");
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
