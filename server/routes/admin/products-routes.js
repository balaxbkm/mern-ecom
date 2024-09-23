const express = require("express");
const {handleImageUpload, addProduct, fetchAllProducts, fetchProduct, updateProduct, deleteProduct} = require("../../controllers/admin/products-controller");
const {upload} = require("../../helpers/cloudinary");

const router = express.Router();

router.post("/upload-image", upload.single("my_file"), handleImageUpload);
router.post("/", addProduct);
router.get("/", fetchAllProducts);
router.get("/:id", fetchProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;