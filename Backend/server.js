import express from "express";
import "dotenv/config";
import { connectToDB } from "./config/db.config.js";
import cors from "cors";
import { allRoutes } from "./routes/index.js";
import cookieParser from "cookie-parser";
const port = process.env.PORT || 5000;
const app = express();
//middlewares
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(allRoutes);
//Connection to the database
connectToDB();
//Server listening
app.listen(port, () => {
  console.log(`Server listening to the port ${port}`);
});
