import express from "express";
import { upload } from "../config/multer.js";
import {
  addProduct,
  analyzeImage,
  getProduct,
  handleShow,
} from "../controllers/ProductController.js";
export const productRoute = express.Router();
productRoute.get("/get", getProduct);
productRoute.post("/addProduct", upload.array("image", 6), addProduct);
productRoute.post("/analyzeImage", upload.single("image"), analyzeImage);
productRoute.post("/handleShow", handleShow);
