const express = require("express");
const { addFeatureImage, getFeatureImages, deleteFeatureImage } = require("../../controllers/common/feature-controller");

const router = express.Router();

router.post("/", addFeatureImage);
router.get("/", getFeatureImages);
router.delete("/:featureId", deleteFeatureImage);

module.exports = router;