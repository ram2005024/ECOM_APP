import express from "express";
import {
  plusMemberSession,
  verifySubscriptionSession,
} from "../controllers/SubscriptionController.js";
export const subscriptionRoute = express.Router();
subscriptionRoute.post("/plus/session", plusMemberSession);
subscriptionRoute.post("/plus/session/verify", verifySubscriptionSession);
