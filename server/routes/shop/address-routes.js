const express = require("express");
const { addAddress, fetchAllAddresses, updateAddress, deleteAddress } = require("../../controllers/shop/address-controller");

const router = express.Router();

router.post("/", addAddress);
router.get("/:userId", fetchAllAddresses);
router.put("/:userId/:addressId", updateAddress);
router.delete("/:userId/:addressId", deleteAddress);

module.exports = router;