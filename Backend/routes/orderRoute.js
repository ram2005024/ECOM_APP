import express from "express";
import { protectRoute } from "../middlewares/protect.js";
import { changeStatus, getOrders } from "../controllers/OrderController.js";
export const orderRouter = express.Router();
//Routes for orders------
orderRouter.get("/get", protectRoute, getOrders);
orderRouter.post("/changeStatus", protectRoute, changeStatus);
