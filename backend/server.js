import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";
import movieRoutes from "./routes/movie.route.js";
import tvRoutes from "./routes/tv.route.js";
import searchRoutes from "./routes/search.route.js";
import path from "path";
import cors from "cors"
import { protectRoute } from "./middleware/protectRoute.js";
import { ENV_VARS } from "./config/envVar.js";
import connectDB from "./config/db.js";

const app = express();
app.use(express.json()); //allow us to use parse req.body   e.g {abc,cde}=req.body
app.use(cookieParser());
app.use(cors())

const PORT = ENV_VARS.PORT;
const __dirname = path.resolve();

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/movie", protectRoute, movieRoutes);
app.use("/api/v1/tv", protectRoute, tvRoutes);
app.use("/api/v1/search", protectRoute, searchRoutes);

if (ENV_VARS.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get((req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}
console.log(ENV_VARS.NODE_ENV);
app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
  connectDB();
  
});
