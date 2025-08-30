const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    productId: {
      type: mongoose.Types.ObjectId,
      ref: "products",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    totalCost: {
      type: Number,
      required: true,
    },
    shippingStatus: {
      type: String,
      enum: ["pending", "shipped", "delivered"],
      default: "pending",
    },
    customerId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "users"
    },
  },
  { timestamps: true }
);

const orderModel = mongoose.model("orders", orderSchema);

module.exports = orderModel;
