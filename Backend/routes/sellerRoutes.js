import express from "express";
import {
  getSeller,
  getSellerById,
  getSellerOrder,
  reapplySeller,
  registerSellerData,
  sellerAllDetails,
} from "../controllers/SellerController.js";
import { upload } from "../config/multer.js";
import { protectRoute } from "../middlewares/protect.js";
export const sellerRoute = express.Router();
sellerRoute.post("/register", upload.single("storeImage"), registerSellerData);
sellerRoute.post("/get", getSeller);
sellerRoute.post("/reapply", upload.single("storeImage"), reapplySeller);
sellerRoute.get("/getOrders", protectRoute, getSellerOrder);
sellerRoute.get("/getSeller", getSellerById);
sellerRoute.get("/getAllDetails", protectRoute, sellerAllDetails);
