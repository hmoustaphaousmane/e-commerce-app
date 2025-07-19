const express = require("express");

const { getAllProducts, addProduct, deleteProduct } = require("../controller/productController");
const isAdmin = require("../middleware/isAdmin");

const router = express.Router();

router.get("/", getAllProducts);

// Middleware that checks the is logged in and has the role admin
router.use(isAdmin);

router.post("/", addProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
