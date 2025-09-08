import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// ejemplo CRUD mínimo
app.get("/api/ping", (_req, res) => res.json({ pong: true }));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
