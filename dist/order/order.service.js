"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_model_1 = __importDefault(require("./order.model"));
const save = async (order, session) => {
    if (session) {
        return await order.save({ session });
    }
    else {
        return await order.save();
    }
};
const findAllOrders = () => {
    return order_model_1.default.find({})
        .populate("products.productid")
        .populate("userid")
        .populate("paymentid");
};
const findOrdersByUserId = (userId) => {
    return order_model_1.default.find({
        userid: userId,
    });
};
const findById = (id) => {
    return order_model_1.default.findOne({ _id: id }).populate("paymentid");
};
const editOrderDetails = async (id, updatedDetails) => {
    return await order_model_1.default.findByIdAndUpdate(id, updatedDetails, { new: true });
};
const deleteOrderById = async (orderId) => {
    return await order_model_1.default.findByIdAndDelete(orderId);
};
exports.default = {
    save,
    findOrdersByUserId,
    findById,
    findAllOrders,
    editOrderDetails,
    deleteOrderById,
};
