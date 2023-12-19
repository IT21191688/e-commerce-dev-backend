"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = __importDefault(require("../auth/auth.middleware"));
const payment_controller_1 = require("./payment.controller");
const constant_1 = __importDefault(require("../constant"));
const PaymentRouter = (0, express_1.Router)();
PaymentRouter.post("/createPayment", auth_middleware_1.default.authorize([
    constant_1.default.USER.ROLES.ADMIN,
    constant_1.default.USER.ROLES.USER,
]), payment_controller_1.CreatePayment);
PaymentRouter.get("/retriveAllPayment", auth_middleware_1.default.authorize([
    constant_1.default.USER.ROLES.ADMIN,
    constant_1.default.USER.ROLES.USER,
]), payment_controller_1.RetrieveAllPayments);
PaymentRouter.get("/retriveAllPaymentUsers/:userId", auth_middleware_1.default.authorize([
    constant_1.default.USER.ROLES.ADMIN,
    constant_1.default.USER.ROLES.USER,
]), payment_controller_1.RetrieveAllUserPayments);
PaymentRouter.get("/retrivePayment/:paymentId", auth_middleware_1.default.authorize([
    constant_1.default.USER.ROLES.ADMIN,
    constant_1.default.USER.ROLES.USER,
]), payment_controller_1.RetrievePaymentDetailsUsingId);
exports.default = PaymentRouter;
