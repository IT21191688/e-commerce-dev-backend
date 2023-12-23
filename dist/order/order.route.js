"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = __importDefault(require("../auth/auth.middleware"));
const order_controller_1 = require("./order.controller");
const constant_1 = __importDefault(require("../constant"));
const OrderRouter = (0, express_1.Router)();
OrderRouter.post("/createOrder", auth_middleware_1.default.authorize([
    constant_1.default.USER.ROLES.ADMIN,
    constant_1.default.USER.ROLES.USER,
]), order_controller_1.CreateOrder);
OrderRouter.get("/getAllOrders", auth_middleware_1.default.authorize([
    constant_1.default.USER.ROLES.ADMIN,
    constant_1.default.USER.ROLES.USER,
]), order_controller_1.FindAllOrders);
OrderRouter.post("/updateOrder/:orderId", auth_middleware_1.default.authorize([constant_1.default.USER.ROLES.ADMIN]), order_controller_1.EditOrderDetails);
OrderRouter.get("/getOneOrder/:orderId", auth_middleware_1.default.authorize([
    constant_1.default.USER.ROLES.ADMIN,
    constant_1.default.USER.ROLES.USER,
]), order_controller_1.FindOneOrderById);
OrderRouter.get("/getOrdersUser", auth_middleware_1.default.authorize([
    constant_1.default.USER.ROLES.ADMIN,
    constant_1.default.USER.ROLES.USER,
]), order_controller_1.FindAllOrdersByUserId);
OrderRouter.delete("/deleteOrder/:orderId", auth_middleware_1.default.authorize([constant_1.default.USER.ROLES.ADMIN]), order_controller_1.DeleteOrder);
exports.default = OrderRouter;
