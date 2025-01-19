import express from 'express';
import { authenticate } from '../middleware/authMiddleware.js';
import { addToCart, getCart, removeCartItem, updateCartItemQuantity } from '../controllers/cartController.js';

const router = express.Router();

router.post("/add", authenticate(), addToCart);
router.get("/", authenticate(), getCart);
router.put("/:cartId", authenticate(), updateCartItemQuantity);
router.delete("/:id", authenticate(), removeCartItem);
export default router;
