import express from "express";
import {
  addCart,
  getCartDetail,
  handleCartItemDelete,
  handleDecreaseCart,
  handleIncreaseCart,
  stripeSession,
  verifyCoupen,
  verifyPayment,
} from "../controllers/CartController.js";
import { protectRoute } from "../middlewares/protect.js";
export const cartRouter = express.Router();
cartRouter.post("/addCart", protectRoute, addCart);
cartRouter.post("/increaseQuantity", protectRoute, handleIncreaseCart);
cartRouter.post("/decreaseQuantity", protectRoute, handleDecreaseCart);
cartRouter.get("/getCartDetail", protectRoute, getCartDetail);
cartRouter.delete("/delete", protectRoute, handleCartItemDelete);
cartRouter.post("/coupenApply", protectRoute, verifyCoupen);
cartRouter.post("/payment/stripe-session", protectRoute, stripeSession);
cartRouter.post("/payment/verify", protectRoute, verifyPayment);
