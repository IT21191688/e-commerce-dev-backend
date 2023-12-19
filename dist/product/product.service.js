"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_model_1 = __importDefault(require("./product.model"));
const save = async (product, session) => {
    if (session) {
        return await product.save({ session });
    }
    else {
        return await product.save();
    }
};
const findAllProduct = () => {
    return product_model_1.default.find({});
};
const findAllByAddedBy = (addedBy) => {
    return product_model_1.default.find({
        addedBy,
    });
};
const findById = (id) => {
    return product_model_1.default.findOne({ _id: id });
};
exports.default = {
    save,
    findAllByAddedBy,
    findById,
    findAllProduct,
};
