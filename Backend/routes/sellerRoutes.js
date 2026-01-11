import express from "express";
import {
  disableSeller,
  getAllSellers,
  getSeller,
  getSellerById,
  getSellerOrder,
  reapplySeller,
  registerSellerData,
  sellerAllDetails,
} from "../controllers/SellerController.js";
import { upload } from "../config/multer.js";
import { protectRoute } from "../middlewares/protect.js";
import { protectSellerRoute } from "../middlewares/protectSeller.js";
export const sellerRoute = express.Router();
sellerRoute.post(
  "/register",
  protectRoute,

  upload.single("storeImage"),
  registerSellerData
);
sellerRoute.post("/get", protectRoute, getSeller);
sellerRoute.post(
  "/reapply",
  protectRoute,

  upload.single("storeImage"),
  reapplySeller
);
sellerRoute.get("/getOrders", protectRoute, protectSellerRoute, getSellerOrder);
sellerRoute.get("/getSeller", protectRoute, getSellerById);
sellerRoute.get(
  "/getAllDetails",
  protectRoute,

  sellerAllDetails
);
sellerRoute.get(
  "/getAllStores",
  protectRoute,

  getAllSellers
);

sellerRoute.get("/disable/seller", protectRoute, disableSeller);
