const express = require("express");
const { createOrder, capturePayment, getOrders, getOrderDetails } = require("../../controllers/shop/order-controller");

const router = express.Router();

router.post("/", createOrder);
router.post("/capture", capturePayment);
router.get("/:userId", getOrders);
router.get("/:userId/:orderId", getOrderDetails);

module.exports = router;