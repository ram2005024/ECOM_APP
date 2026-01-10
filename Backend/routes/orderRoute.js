import express from "express";
import { protectRoute } from "../middlewares/protect.js";
import {
  changeStatus,
  createOrderOnCOD,
  getAllOrdersAnDate,
  getOrders,
} from "../controllers/OrderController.js";
export const orderRouter = express.Router();
//Routes for orders------
orderRouter.get("/get", protectRoute, getOrders);
orderRouter.get("/getAllOrdersAndDate", getAllOrdersAnDate);
orderRouter.post("/changeStatus", protectRoute, changeStatus);
orderRouter.post("/create-order", protectRoute, createOrderOnCOD);
