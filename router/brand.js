const express = require("express");

const brandController = require("../controller/brandController");
const isAdmin = require("../middleware/isAdmin");

const router = express.Router();

router.post("/", isAdmin, brandController.createBrand);
router.put("/:id", brandController.updateBrand);
router.get("/", brandController.getBrands);
router.delete("/:id", brandController.deleteBrand);

module.exports = router;
