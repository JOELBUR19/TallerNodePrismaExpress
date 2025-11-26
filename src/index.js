import express from "express";
import authRoutes from "./controllers/register.js";

const app = express();
const PORT = 3000;

app.use("/auth", authRoutes);
app.use(express.json());
app.get("/", (req, res) => {
    res.send("Api running")
})

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});