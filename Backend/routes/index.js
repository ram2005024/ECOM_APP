import express from "express";
import { userRoute } from "./userAuth.js";
import { sellerRoute } from "./sellerRoutes.js";
export const allRoutes = express.Router();
allRoutes.use("/auth/user", userRoute);
allRoutes.use("/store", sellerRoute);
