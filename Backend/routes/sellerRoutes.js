import express from "express";
import {
  addProduct,
  getSeller,
  reapplySeller,
  registerSellerData,
} from "../controllers/SellerController.js";
import { upload } from "../config/multer.js";
export const sellerRoute = express.Router();
sellerRoute.post("/register", upload.single("storeImage"), registerSellerData);
sellerRoute.post("/get", getSeller);
sellerRoute.post("/reapply", upload.single("storeImage"), reapplySeller);
sellerRoute.post("/addProduct", upload.array("image", 6), addProduct);
