import express from "express";
import {
  disableStatus,
  getSubscription,
  getUser,
  handleLogout,
  login,
  userRegister,
} from "../controllers/UserAuthController.js";
import { protectRoute } from "../middlewares/protect.js";

export const userRoute = express.Router();
//DEFINING ROUTES FOR USER AUTHENTICATION
userRoute.post("/login", login);
userRoute.get("/me", protectRoute, getUser);
userRoute.get("/logout", handleLogout);
userRoute.post("/register", userRegister);
userRoute.get("/getSubscription", protectRoute, getSubscription);
userRoute.get("/plusDisable", protectRoute, disableStatus);
