import express from "express";
import {
  addCart,
  getCartDetail,
  handleDecreaseCart,
  handleIncreaseCart,
} from "../controllers/CartController.js";
import { protectRoute } from "../middlewares/protect.js";
export const cartRouter = express.Router();
cartRouter.post("/addCart", protectRoute, addCart);
cartRouter.post("/increaseQuantity", protectRoute, handleIncreaseCart);
cartRouter.post("/decreaseQuantity", protectRoute, handleDecreaseCart);
cartRouter.get("/getCartDetail", protectRoute, getCartDetail);
