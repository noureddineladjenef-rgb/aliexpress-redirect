import express from "express";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());

// ---- ROUTES ----
import redirectRoute from "./api/redirect.js";
import callbackRoute from "./api/callback.js";
import tokenRoute from "./api/token.js";
import verifyRoute from "./api/verify.js";

app.use("/api/redirect", redirectRoute);
app.use("/api/callback", callbackRoute);
app.use("/api/token", tokenRoute);
app.use("/api/verify", verifyRoute);

// Home route
app.get("/", (req, res) => {
  res.send("AliExpress Redirect API is running ✔");
});

// ---- START SERVER ----
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port:", PORT);
});