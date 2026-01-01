import express from "express";
import {
  addCategory,
  approveStatus,
  getCategory,
  getStore,
  rejectStatus,
} from "../controllers/AdminController.js";
import { protectRoute } from "../middlewares/protect.js";
export const adminRouter = express.Router();
adminRouter.get("/approve/store", protectRoute, getStore);
adminRouter.post("/status/approve", protectRoute, approveStatus);
adminRouter.post("/status/reject", protectRoute, rejectStatus);
adminRouter.post("/addCategory", addCategory);
adminRouter.get("/getCategory", getCategory);
