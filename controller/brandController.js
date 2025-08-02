const brandModel = require("../schema/brand");

const createBrand = async (req, res) => {
  const { brandName } = req.body;

  const newBrand = await brandModel.create({ brandName });

  res.send({
    message: "New brand added successfully.",
    newBrand,
  });
};

const updateBrand = async (req, res) => {
  const { id } = req.params;
  const { brandName } = req.body;
  console.log(req.body);
  console.log(brandName);

  const brandToUpdate = await brandModel.findById(id);
  console.log("To update:", brandToUpdate);

  if (!brandToUpdate) {
    res.status(404).send({
      massage: "The requested brand does not exist.",
    });
    return;
  }

  const updatedBrand = await brandModel.findByIdAndUpdate(
    id,
    { brandName },
    { new: true }
  );
  console.log("Updated:", updatedBrand);

  res.send({
    message: "Brand updated successfully.",
    updatedBrand,
  });
};

const getBrands = async (req, res) => {
  try {
    const brands = await brandModel.find();

    res.send({ brands });
  } catch (error) {
    res.status(500).send({ error });
  }
};

const deleteBrand = async (req, res) => {
  const { id } = req.params;

  const brandToDelete = await brandModel.findById(id);

  if (!brandToDelete) {
    res.status(404).send({ message: "Brand not found" });
    return;
  }

  const deletedBrand = await brandModel.findByIdAndDelete(id);

  res.send({
    message: "Brand deleted successfully.",
    deletedBrand,
  });
};

module.exports = {
  createBrand,
  updateBrand,
  getBrands,
  deleteBrand,
};
