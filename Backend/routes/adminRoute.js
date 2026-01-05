import express from "express";
import {
  addCategory,
  addCoupens,
  approveStatus,
  changeCoupenStatus,
  getCategory,
  getCoupens,
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
adminRouter.post("/addCoupens", addCoupens);
adminRouter.get("/getCoupens", protectRoute, getCoupens);
adminRouter.post("/changeActive", changeCoupenStatus);
