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

export default {
  addToCart,
  findCartItemsByUserId,
  removeCartItem,
};
