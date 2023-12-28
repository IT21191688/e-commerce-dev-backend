// Cart service
import Cart from "./cart.model";

const addToCart = async (cartDetails: any) => {
  return await Cart.create(cartDetails);
};

const findCartItemsByUserId = (userId: any) => {
  return Cart.find({ userid: userId }).populate("productid").populate("userid");
};

const removeCartItem = async (cartItemId: any) => {
  return await Cart.findByIdAndDelete(cartItemId);
};

const removeAllCartItems = async (userId: any) => {
  return await Cart.deleteMany({ userid: userId });
};

export default {
  addToCart,
  findCartItemsByUserId,
  removeCartItem,
  removeAllCartItems,
};
