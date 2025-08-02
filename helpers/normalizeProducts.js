require("dotenv").config();
const mongoose = require("mongoose");
const productModel = require("../schema/product");


(async () => {
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connection to DB established");
  })
  .catch((error) => {
    console.error(error);
  });

  await productModel.updateMany({}, {
    brand: "688e0ed4357ed84784698ce8"
  })

  console.log("Collection normalized");
  
  return;
})();
