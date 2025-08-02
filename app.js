const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const productsRouter = require("./router/product");
const authRouter = require("./router/auth");
const brandRouter = require("./router/brand");

const app = express();
const PORT = 3000;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Successfuly connected to database");
  })
  .catch((error) => {
    console.error("Unable to connect to database. Error::", error);
  });

// Middlewares
app.use(express.json());

app.use("/products", productsRouter);
app.use("/auth", authRouter)
app.use("/brands", brandRouter);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
