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
import passport from "passport";
import { googleAuthController } from "../controllers/passportController.js";

export const userRoute = express.Router();
//DEFINING ROUTES FOR USER AUTHENTICATION
userRoute.post("/login", login);
userRoute.get("/me", protectRoute, getUser);
userRoute.get("/logout", handleLogout);
userRoute.post("/register", userRegister);
userRoute.get("/getSubscription", protectRoute, getSubscription);
userRoute.get("/plusDisable", protectRoute, disableStatus);
//For goolge authentication------
userRoute.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);
//Redirect
userRoute.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
  }),
  googleAuthController
);
