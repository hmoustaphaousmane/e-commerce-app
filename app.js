const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

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

// Endpoints
app.get("/", (req, res) => {
  res.send("E-commerce App");
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
