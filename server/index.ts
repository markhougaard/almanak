import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { initDb } from "./db.js";
import { createRecipeRouter } from "./routes/recipes.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const db = initDb();

const apiRouter = express.Router();
apiRouter.use("/recipes", createRecipeRouter(db));
app.use("/api", apiRouter);

// In production, serve the built Vite frontend
if (process.env.NODE_ENV === "production") {
  const clientDist = path.resolve(__dirname, "../dist");
  app.use(express.static(clientDist));
  app.get("/{*splat}", (_req, res) => {
    res.sendFile(path.join(clientDist, "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Almanak server listening on port ${PORT}`);
});
