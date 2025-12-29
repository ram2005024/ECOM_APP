import express from "express";
import {
  getSeller,
  registerSellerData,
} from "../controllers/SellerController.js";
import { upload } from "../config/multer.js";
export const sellerRoute = express.Router();
sellerRoute.post("/register", upload.single("storeImage"), registerSellerData);
sellerRoute.post("/get", getSeller);
