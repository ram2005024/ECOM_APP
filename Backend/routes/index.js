import express from "express";
import { userRoute } from "./userAuth.js";
export const allRoutes = express.Router();
allRoutes.use("/auth/user", userRoute);
