import express from "express";
import { getStore } from "../controllers/AdminController.js";
import { protectRoute } from "../middlewares/protect.js";
export const adminRouter = express.Router();
adminRouter.get("/approve/store", protectRoute, getStore);
