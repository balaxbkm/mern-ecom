const express = require("express");
const {addToCart, getCartItems, updateCart, deleteCartItem} = require("../../controllers/shop/cart-controller");

const router = express.Router();

router.post("/", addToCart);
router.get("/:userId", getCartItems);
router.put("/", updateCart);
router.delete("/:userId/:productId", deleteCartItem);

module.exports = router;