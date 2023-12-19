"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const payment_model_1 = __importDefault(require("./payment.model"));
const createPayment = async (paymentDetails) => {
    return await payment_model_1.default.create(paymentDetails);
};
const retrieveAllPayments = async () => {
    return await payment_model_1.default.find({});
};
const retrievePaymentDetailsById = async (paymentId) => {
    return await payment_model_1.default.findById(paymentId);
};
const retrieveAllUserPayments = async (userId) => {
    return await payment_model_1.default.find({ userId });
};
exports.default = {
    createPayment,
    retrieveAllPayments,
    retrievePaymentDetailsById,
    retrieveAllUserPayments,
};
