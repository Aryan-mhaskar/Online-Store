import express from "express";

import {
getProducts,
getProductById,
searchProducts,
categoryProducts
} from "../controllers/productController.js";

const router = express.Router();
router.get("/", getProducts);
router.get("/search", searchProducts);
router.get("/category/:category", categoryProducts);
router.get("/:id", getProductById);
export default router;