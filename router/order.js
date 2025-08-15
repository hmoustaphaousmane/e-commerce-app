const express = require("express");
const isLoggedIn = require("../middleware/isLoggedIn");
const roleBasedAccess = require("../middleware/roleBasedAccess");
const {
  createOrder,
  getOrders,
  getSingleOrder,
  updateOrderStatus,
} = require("../controller/orderController");

const router = express.Router();

router.use(isLoggedIn)

router.post("/", roleBasedAccess(["customer"]), createOrder);
router.get("/", roleBasedAccess(["admin"]), getOrders);
router.get("/:id", roleBasedAccess(["admin"]), getSingleOrder);
router.patch("/:id", roleBasedAccess(["admin"]), updateOrderStatus);

module.exports = router;
