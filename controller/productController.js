const { populate } = require("dotenv");
const Product = require("../schema/product");
const brandModel = require("../schema/brand");

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
  const { productName, cost, productImages, description, stockStatus, brandId } =
    req.body;
  
  const brandDetails = await brandModel.findById(brandId);
  console.log(brandDetails);  

  if(!brandDetails) {
    res.status(404).send({
      message: "The provided brand does not exist."
    });
    return;
  }

  const newProduct = await Product.create({
    productName,
    cost,
    productImages,
    description,
    stockStatus,
    brand: brandId
  });
  console.log(newProduct);

  res.status(201).send({
    message: "Product added successfully",
    newProduct,
  });
};

const deleteProduct = async (req, res) => {
  const productId = req.params.id;

  let productToDelete = await Product.findByIdAndDelete(productId);

  res.send({
    message: "Product deleted successfully",
    productToDelete,
  });
};

const getProductByBrand = async (req, res) => {
  const { brand, page, limit } = req.params;

  const products = await Product.paginate(
    {brand},
    {
      page,
      limit,
      populate: {
        path: "brand",
      },
    }
  );

  res.send({ products });
};

module.exports = {
  getAllProducts,
  addProduct,
  deleteProduct,
  getProductByBrand,
};
