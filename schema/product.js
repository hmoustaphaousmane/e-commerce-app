const mongoose = require("mongoose");
const paginate = require("mongoose-paginate-v2");

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
    brand: {
      type: mongoose.Types.ObjectId,
      ref: "brands",
      require: true
    }
  },
  {
    timestamps: true,
  }
);

schema.plugin(paginate);

const productModel = mongoose.model("products", schema);

module.exports = productModel;
