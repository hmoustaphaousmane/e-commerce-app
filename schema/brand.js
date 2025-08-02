const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    brandName: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

const brandModel = mongoose.model("brands", schema);

module.exports = brandModel;

