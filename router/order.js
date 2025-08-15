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

router.post("/", roleBasedAccess(["customer"]), (req, res) => {
  res.send(`${req.method} ${req.baseUrl} works`)
});
router.get("/", roleBasedAccess(["admin"]), (req, res) => {
  res.send(`${req.method} ${req.baseUrl} works`)
});
router.get("/:id", roleBasedAccess(["admin"]), (req, res) => {
  res.send(`${req.method} ${req.baseUrl} works`)
});
router.patch("/:id", roleBasedAccess(["admin"]), (req, res) => {
  res.send(`${req.method} ${req.baseUrl} works`)
});

module.exports = router;
