"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = __importDefault(require("../auth/auth.middleware"));
const cart_controller_1 = require("./cart.controller");
const constant_1 = __importDefault(require("../constant"));
const CartRouter = (0, express_1.Router)();
CartRouter.post("/addCart", auth_middleware_1.default.authorize([
    constant_1.default.USER.ROLES.ADMIN,
    constant_1.default.USER.ROLES.USER,
]), cart_controller_1.AddToCart);
CartRouter.get("/getCartItemsUserId/:userId", auth_middleware_1.default.authorize([
    constant_1.default.USER.ROLES.ADMIN,
    constant_1.default.USER.ROLES.USER,
]), cart_controller_1.GetCartItemsByUserId);
CartRouter.delete("/removeCartItem/:cartItemId", auth_middleware_1.default.authorize([
    constant_1.default.USER.ROLES.ADMIN,
    constant_1.default.USER.ROLES.USER,
]), cart_controller_1.RemoveCartItem);
exports.default = CartRouter;
