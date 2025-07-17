const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    productName: {
      type: String,
      require: true,
    },
    cost: {
      type: Number,
      require: true,
    },
    productImages: [String],
    description: {
      type: String,
      require: true,
    },
    stockStatus: {
      type: String,
      require: true,
      enum: ["in-stock", "low-stock", "out-of-stock"],
      default: "in-stock",
    },
  },
  {
    timestamps: true,
  }
);

const productModel = mongoose.model("products", schema);

module.exports = productModel;
