import express from "express";
import {
  addCategory,
  addCoupens,
  allDetails,
  approveStatus,
  changeCoupenStatus,
  contact,
  getCategory,
  getCoupens,
  getStore,
  rejectStatus,
  setStatus,
} from "../controllers/AdminController.js";
import { protectRoute } from "../middlewares/protect.js";
import { protectAdmin } from "../middlewares/protectAdmin.js";
export const adminRouter = express.Router();
adminRouter.get("/approve/store", protectRoute, protectAdmin, getStore);
adminRouter.post("/status/approve", protectRoute, protectAdmin, approveStatus);
adminRouter.post("/status/reject", protectRoute, protectAdmin, rejectStatus);
adminRouter.post("/addCategory", protectRoute, protectAdmin, addCategory);
adminRouter.get("/getCategory", protectRoute, getCategory);
adminRouter.post("/addCoupens", protectRoute, protectAdmin, addCoupens);
adminRouter.get("/getCoupens", protectRoute, getCoupens);
adminRouter.post(
  "/changeActive",
  protectRoute,
  protectAdmin,
  changeCoupenStatus
);
adminRouter.get("/getDetails", protectRoute, protectAdmin, allDetails);
adminRouter.post("/status", protectRoute, protectAdmin, setStatus);
adminRouter.post("/contact", protectRoute, contact);
