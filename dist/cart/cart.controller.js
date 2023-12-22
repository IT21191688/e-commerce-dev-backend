"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveCartItem = exports.GetCartItemsByUserId = exports.AddToCart = void 0;
const http_status_codes_1 = require("http-status-codes");
const cart_service_1 = __importDefault(require("./cart.service"));
const response_1 = __importDefault(require("../util/response"));
const NotFoundError_1 = __importDefault(require("../error/error.classes/NotFoundError"));
const user_service_1 = __importDefault(require("../user/user.service"));
const AddToCart = async (req, res) => {
    try {
        const body = req.body;
        const auth = req.auth;
        const data = {
            userid: auth._id,
            productid: body.productid,
            quantity: body.quantity,
        };
        const user = await user_service_1.default.findById(auth._id);
        if (!user) {
            throw new NotFoundError_1.default("User not found!");
        }
        const addedCartItem = await cart_service_1.default.addToCart(data);
        (0, response_1.default)(res, true, http_status_codes_1.StatusCodes.CREATED, "Item added to cart successfully!", { cartItem: addedCartItem });
    }
    catch (error) {
        console.error(error);
        (0, response_1.default)(res, false, http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, "Error adding item to cart", { error: error.message });
    }
};
exports.AddToCart = AddToCart;
const GetCartItemsByUserId = async (req, res) => {
    try {
        // const userId = req.params.userId;
        const auth = req.auth;
        const userId = auth._id;
        const user = await user_service_1.default.findById(auth._id);
        if (!user) {
            throw new NotFoundError_1.default("User not found!");
        }
        const cartItems = await cart_service_1.default.findCartItemsByUserId(userId);
        (0, response_1.default)(res, true, http_status_codes_1.StatusCodes.OK, "Cart items retrieved successfully!", { cartItems: cartItems });
    }
    catch (error) {
        console.error(error);
        (0, response_1.default)(res, false, http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, "Error retrieving cart items", { error: error.message });
    }
};
exports.GetCartItemsByUserId = GetCartItemsByUserId;
const RemoveCartItem = async (req, res) => {
    try {
        const cartItemId = req.params.cartItemId;
        const auth = req.auth;
        const user = await user_service_1.default.findById(auth._id);
        if (!user) {
            throw new NotFoundError_1.default("User not found!");
        }
        await cart_service_1.default.removeCartItem(cartItemId);
        (0, response_1.default)(res, true, http_status_codes_1.StatusCodes.OK, "Cart item removed successfully!", null);
    }
    catch (error) {
        console.error(error);
        (0, response_1.default)(res, false, http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, "Error removing cart item", { error: error.message });
    }
};
exports.RemoveCartItem = RemoveCartItem;
