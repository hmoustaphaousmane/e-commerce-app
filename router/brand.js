const express = require("express");

const brandController = require("../controller/brandController");
const isLoggedIn = require("../middleware/isLoggedIn");
const roleBasedAccess = require("../middleware/roleBasedAccess");

const router = express.Router();

router.get("/", brandController.getBrands);

// Middleware that checks the is logged in
router.use(isLoggedIn);

router.post("/", roleBasedAccess(["admin"]), brandController.createBrand);
router.put("/:id", roleBasedAccess(["admin"]), brandController.updateBrand);
router.delete("/:id", roleBasedAccess(["admin"]), brandController.deleteBrand);

module.exports = router;
