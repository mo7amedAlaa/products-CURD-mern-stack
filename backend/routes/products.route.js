import express from "express";
import { createProduct, deleteProduct, getProductById, getProducts, updateProduct } from "../controllers/product.controller.js";
const router = express.Router();
router.get("/", getProducts)
router.post("/", createProduct)
router.get("/:id", getProductById)
router.delete("/:id", deleteProduct)
router.put("/:id", updateProduct)
export default router;