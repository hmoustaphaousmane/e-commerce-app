const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { createServer } = require("node:http");
const { Server } = require("socket.io");

const productsRouter = require("./router/product");
const authRouter = require("./router/auth");
const brandRouter = require("./router/brand");
const orderRouter = require("./router/order");

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

const httpServer = createServer(app);

const ioServer = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: "GET, POST, PUT, PATCH, DELETE",
  },
});

// Middlewares
app.use(express.json());
app.use((req, res, next) => {
  req.io = ioServer;
  next();
});

app.use("/products", productsRouter);
app.use("/auth", authRouter);
app.use("/brands", brandRouter);
app.use("/orders", orderRouter);

// Socket.IO users authentication middleware
ioServer.use((socket, next) => {
  const auth = socket.handshake.headers.authorization;
  const [type, token] = auth.split(" ");
  console.log("type", type, "token", token);
  if (type.toLocaleLowerCase() == "bearer") {
    const value = jwt.verify(token, process.env.JWT_KEY);

    socket.handshake.auth.decoded = value;
  } else {
    socket.send("You need to supply an authorization token");
  }
  next();
});

ioServer.on("connection", (socket) => {
  const decoded = socket.handshake.auth.decoded;
  const userId = decoded.userId.toString();

  console.log(`Connected user ${socket.id} userId => ${userId}`);

  socket.join(decoded.userId);
  
  socket.on("disconnect", () => {
    socket.leave(decoded.userId);
    console.log("Disconnected user :", socket.id);
  });
});

httpServer.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
