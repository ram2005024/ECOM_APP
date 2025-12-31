import express from "express";
import {
  approveStatus,
  getStore,
  rejectStatus,
} from "../controllers/AdminController.js";
import { protectRoute } from "../middlewares/protect.js";
export const adminRouter = express.Router();
adminRouter.get("/approve/store", protectRoute, getStore);
adminRouter.post("/status/approve", protectRoute, approveStatus);
adminRouter.post("/status/reject", protectRoute, rejectStatus);
