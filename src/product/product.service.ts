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

const editProductDetails = async (id: string, updatedDetails: any) => {
  return await Product.findByIdAndUpdate(id, updatedDetails, { new: true });
};

const deleteProductById = async (productId: string) => {
  return await Product.findByIdAndDelete(productId);
};

export default {
  save,
  findAllByAddedBy,
  findById,
  findAllProduct,
  editProductDetails,
  deleteProductById,
};
