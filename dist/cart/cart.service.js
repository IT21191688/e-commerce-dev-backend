"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Cart service
const cart_model_1 = __importDefault(require("./cart.model"));
const addToCart = async (cartDetails) => {
    return await cart_model_1.default.create(cartDetails);
};
const findCartItemsByUserId = (userId) => {
    return cart_model_1.default.find({ userid: userId }).populate("productid").populate("userid");
};
const removeCartItem = async (cartItemId) => {
    return await cart_model_1.default.findByIdAndDelete(cartItemId);
};
const removeAllCartItems = async (userId) => {
    return await cart_model_1.default.deleteMany({ userid: userId });
};
exports.default = {
    addToCart,
    findCartItemsByUserId,
    removeCartItem,
    removeAllCartItems,
};
