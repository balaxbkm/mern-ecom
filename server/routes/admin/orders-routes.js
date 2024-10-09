const express = require("express");
const { getOrders, getOrderDetails, updateOrderStatus } = require("../../controllers/admin/orders-controller");

const router = express.Router();

router.get("/", getOrders);
router.get("/:orderId", getOrderDetails);
router.put("/:orderId", updateOrderStatus);

module.exports = router;