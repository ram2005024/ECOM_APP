import express from "express";
import {
  plusMemberSession,
  sellerSubscriptionSession,
  verifySellerSubscription,
  verifySubscriptionSession,
} from "../controllers/SubscriptionController.js";
import { protectRoute } from "../middlewares/protect.js";
export const subscriptionRoute = express.Router();
subscriptionRoute.post("/plus/session", plusMemberSession);
subscriptionRoute.post("/plus/session/verify", verifySubscriptionSession);
subscriptionRoute.post(
  "/seller/session",
  protectRoute,
  sellerSubscriptionSession
);
subscriptionRoute.post("/seller/session/verify", verifySellerSubscription);
