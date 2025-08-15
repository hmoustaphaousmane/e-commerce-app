const { default: mongoose } = require("mongoose");
const orderModel = require("../schema/order");
const productModel = require("../schema/product");

const createOrder = async (req, res) => {
  try {
    const { orders } = req.body;

    if (!orders) {
      return res.status(422).send({
        message: "Orders list is empty. Supply at least one.",
      });
    }

    let newOrders = [];
    let invalidProducts = [];

    const productNames = orders.map((order) => order.productName);
    // console.log(productNames);

    // Get all products in one query
    const products = await productModel.find({
      productName: { $in: productNames },
    });
    const productsMap = new Map(
      products.map((product) => [product.productName, product])
    );

    // List of product names match in database
    const keys = [...productsMap.keys()]; //=> Array.from(productsMap.keys());

    // Loop to check if each order's product is part of the products that came
    // back from database or not
    for (const order of orders) {
      if (keys.includes(order.productName) && order.quantity > 0) {
        const validProduct = productsMap.get(order.productName);
        console.log(`Valid product => ${validProduct}`);

        newOrders.push({
          productName: validProduct.productName,
          productId: validProduct._id,
          quantity: order.quantity,
          totalCost: order.quantity * validProduct.cost,
          customerId: req.decoded.userId,
        });
      } else {
        invalidProducts.push(order.productName);
      }
    }

    if (invalidProducts.length !== 0) {
      console.log("Invalid products list: ", invalidProducts);
      return res.status(422).send({
        message: "There are invalid products in the order.",
        invalidProducts,
      });
    }

    const createdOrder = await orderModel.insertMany(newOrders);

    res.send({
      message: "Order successfully registered",
      createdOrder,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).send({
      error: error.message,
    });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await orderModel.find();

    res.send({ orders });
  } catch (error) {}
};

const getSingleOrder = async (req, res) => {
  const order = await orderModel.findById(req.params.id);

  if (!order) {
    return res.status(404).send({
      message: "Order not found.",
    });
  }

  res.send({ order });
};

const updateOrderStatus = async (req, res) => {
  const orderId = req.params.id;
  const orderExists = await orderModel.findById(orderId);

  if (!orderExists) {
    return res.status(404).send({
      message: "Order not found.",
    });
  }

  const { shippingStatus } = req.body;
  if (!shippingStatus || !["pending", "shipped", "delivered"].includes(shippingStatus)) {
    return res.status(422).send({
      message: "Invalid shipping status.",
    });
  }
  const updatedOrder = await orderModel.findByIdAndUpdate(
    orderId,
    { shippingStatus },
    { new: true }
  );

  res.send({
    message: "Order's shipping status updated successfully.",
    newStatus: shippingStatus,
    updatedOrder,
  });
};

module.exports = { createOrder, getOrders, getSingleOrder, updateOrderStatus };
