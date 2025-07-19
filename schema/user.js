const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    fullName: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    role: {
      type: String,
      require: true,
      enum: ["admin", "customer"],
    },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("users", schema);

module.exports = userModel;
