const express = require("express");

const { getAllProducts, addProduct, deleteProduct } = require("../controller/productController")

const router = express.Router();

router.get("/", getAllProducts);
router.post("/", addProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
