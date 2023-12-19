"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = __importDefault(require("../auth/auth.middleware"));
const order_controller_1 = require("./order.controller");
const constant_1 = __importDefault(require("../constant"));
const ProductRouter = (0, express_1.Router)();
ProductRouter.post("/createOrder", auth_middleware_1.default.authorize([
    constant_1.default.USER.ROLES.ADMIN,
    constant_1.default.USER.ROLES.USER,
]), order_controller_1.CreateOrder);
ProductRouter.get("/getAllOrders", auth_middleware_1.default.authorize([
    constant_1.default.USER.ROLES.ADMIN,
    constant_1.default.USER.ROLES.USER,
]), order_controller_1.FindAllOrders);
/*
ProductRouter.patch(
  "/updateProduct/:productId",
  authMiddleware.authorize([constants.USER.ROLES.ADMIN]),
  EditProductDetails
);

ProductRouter.get(
  "/getOneProduct/:productId",
  authMiddleware.authorize([
    constants.USER.ROLES.ADMIN,
    constants.USER.ROLES.USER,
  ]),
  FindOneProductById
);

ProductRouter.delete(
  "/deleteProduct/:productId",
  authMiddleware.authorize([constants.USER.ROLES.ADMIN]),
  DeleteProduct
);
*/
exports.default = ProductRouter;
