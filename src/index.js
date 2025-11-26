import express from "express";
import authRoutes from "./controllers/register.js";
import authRoutesLogin from "./controllers/login.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = 3000;
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/auth", authRoutesLogin);
app.get("/", (req, res) => {
  res.send("Api running")
})

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});