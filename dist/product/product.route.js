"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = __importDefault(require("../auth/auth.middleware"));
const product_controller_1 = require("./product.controller");
const constant_1 = __importDefault(require("../constant"));
const ProductRouter = (0, express_1.Router)();
ProductRouter.post("/createProduct", auth_middleware_1.default.authorize([constant_1.default.USER.ROLES.ADMIN]), product_controller_1.CreateProduct);
ProductRouter.get("/getAllProduct", auth_middleware_1.default.authorize([
    constant_1.default.USER.ROLES.ADMIN,
    constant_1.default.USER.ROLES.USER,
]), product_controller_1.FindAllProducts);
ProductRouter.patch("/updateProduct/:productId", auth_middleware_1.default.authorize([constant_1.default.USER.ROLES.ADMIN]), product_controller_1.EditProductDetails);
/*
UserRouter.get(
  "/profile",
  authMiddleware.authorize([
    constants.USER.ROLES.ADMIN,
    constants.USER.ROLES.USER,
  ]),
  GetUserProfile
);



*/
exports.default = ProductRouter;
