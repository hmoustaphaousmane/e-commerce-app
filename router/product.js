const express = require("express");

const { getAllProducts, addProduct, deleteProduct, getProductByBrand } = require("../controller/productController");
const isLoggedIn = require("../middleware/isLoggedIn");
const roleBasedAccess = require("../middleware/roleBasedAccess");

const router = express.Router();

router.get("/", getAllProducts);
router.get("/:brand/:page/:limit", getProductByBrand);

// Middleware that checks the is logged in
router.use(isLoggedIn);

router.post("/", roleBasedAccess(["admin"]), addProduct);
router.delete("/:id", roleBasedAccess(["admin"]), deleteProduct);

module.exports = router;
