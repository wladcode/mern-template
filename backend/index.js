import express from "express";
import dotenv from "dotenv";
import path from "path";
import { connectDB } from "./config/db.js";
//import bodyParser from "body-parser";
//import cors from "cors";

import exampleRoutes from "./routes/example.routes.js";
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import registerRoutes from "./routes/register.routes.js";
import catalogRoutes from "./routes/catalog.routes.js";
import { validateJWT } from "./util/jwtUtil.js";

const app = express();
const PORT = process.env.PORT || 5060;
const __dirname = path.resolve();

dotenv.config();

app.use(express.json({ limit: "30mb", extended: true })); // enlugar de boyParser se usa express
app.use(express.urlencoded({ limit: "30mb", extended: true }));

//app.use(cors());
app.use("/api/v1/authenticate", authRoutes);
app.use("/api/v1/register", registerRoutes);
app.use("/api/v1/examples", validateJWT, exampleRoutes);
app.use("/api/v1/user", validateJWT, userRoutes);
app.use("/api/v1/catalogs", validateJWT, catalogRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  connectDB();
  console.log(`Server running at port: ${PORT}`);
});
