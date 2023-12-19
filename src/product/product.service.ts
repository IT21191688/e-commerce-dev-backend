import constants from "../constant";
import Product from "./product.model";

const save = async (product: any, session: any) => {
  if (session) {
    return await product.save({ session });
  } else {
    return await product.save();
  }
};

const findAllProduct = () => {
  return Product.find({});
};

const findAllByAddedBy = (addedBy: any) => {
  return Product.find({
    addedBy,
  });
};

const findById = (id: any) => {
  return Product.findOne({ _id: id });
};

export default {
  save,
  findAllByAddedBy,
  findById,
  findAllProduct,
};
