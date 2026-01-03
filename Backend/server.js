import express from "express";
import "dotenv/config";
import { serve } from "inngest/express";
import { connectToDB } from "./config/db.config.js";
import cors from "cors";
import { allRoutes } from "./routes/index.js";
import cookieParser from "cookie-parser";
const port = process.env.PORT || 5000;
import { inngest, functions } from "./inngest/index.js";
const app = express();
//middlewares
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));
app.use(allRoutes);
app.use("/api/inngest", serve({ client: inngest, functions }));
//Connection to the database
connectToDB();
//Server listening
app.listen(port, () => {
  console.log(`Server listening to the port ${port}`);
});
