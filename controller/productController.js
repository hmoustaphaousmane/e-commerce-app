const Product = require("../schema/product");

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    console.log(products);

    res.send(products);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

const addProduct = async (req, res) => {
  const { productName, cost, productImages, description, stockStatus } =
    req.body;

  const newProduct = await Product.create({
    productName,
    cost,
    productImages,
    description,
    stockStatus,
  });
  console.log(newProduct);

  res.status(201).send({
    message: "Product added successfully",
    newProduct
  })
};

const deleteProduct = async (req, res) => {
  const productId = req.params.id;

  let productToDelete = await Product.findByIdAndDelete(productId);

  res.send({
    message: "Product deleted successfully",
    productToDelete
  })
}

module.exports = {
  getAllProducts,
  addProduct,
  deleteProduct
};
