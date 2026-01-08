import express from "express";
import { protectRoute } from "../middlewares/protect.js";
import {
  changeStatus,
  getAllOrdersAnDate,
  getOrders,
} from "../controllers/OrderController.js";
export const orderRouter = express.Router();
//Routes for orders------
orderRouter.get("/get", protectRoute, getOrders);
orderRouter.get("/getAllOrdersAndDate", getAllOrdersAnDate);
orderRouter.post("/changeStatus", protectRoute, changeStatus);
