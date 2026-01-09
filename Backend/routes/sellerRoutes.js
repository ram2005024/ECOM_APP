import express from "express";
import {
  getAllSellers,
  getSeller,
  getSellerById,
  getSellerOrder,
  reapplySeller,
  registerSellerData,
  sellerAllDetails,
  setStatus,
} from "../controllers/SellerController.js";
import { upload } from "../config/multer.js";
import { protectRoute } from "../middlewares/protect.js";
import { protectSellerRoute } from "../middlewares/protectSeller.js";
export const sellerRoute = express.Router();
sellerRoute.post(
  "/register",
  protectRoute,
  protectSellerRoute,
  upload.single("storeImage"),
  registerSellerData
);
sellerRoute.post("/get", protectRoute, protectSellerRoute, getSeller);
sellerRoute.post(
  "/reapply",
  protectRoute,
  protectSellerRoute,
  upload.single("storeImage"),
  reapplySeller
);
sellerRoute.get("/getOrders", protectRoute, protectSellerRoute, getSellerOrder);
sellerRoute.get("/getSeller", protectRoute, protectSellerRoute, getSellerById);
sellerRoute.get(
  "/getAllDetails",
  protectRoute,
  protectSellerRoute,
  sellerAllDetails
);
sellerRoute.get(
  "/getAllStores",
  protectRoute,
  protectSellerRoute,
  getAllSellers
);
sellerRoute.post("/status", protectRoute, protectSellerRoute, setStatus);
