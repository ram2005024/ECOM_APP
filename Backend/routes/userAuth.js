import express from "express";
import {
  getUser,
  handleLogout,
  login,
  sellerRegister,
} from "../controllers/UserAuthController.js";
import { protectRoute } from "../middlewares/protect.js";

export const userRoute = express.Router();
//DEFINING ROUTES FOR USER AUTHENTICATION
userRoute.post("/login", login);
userRoute.get("/me", protectRoute, getUser);
userRoute.get("/logout", handleLogout);
userRoute.post("/seller/register", sellerRegister);
