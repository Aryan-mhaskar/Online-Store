import express from "express";

import {
    addToCart,
    getCart,
    removeCartItem,
    updateQuantity
} from "../controllers/cartController.js";

const router = express.Router();
router.post("/", addToCart);
router.get("/:user_id", getCart);
router.put("/:id", updateQuantity);
router.delete("/:id", removeCartItem);

export default router;