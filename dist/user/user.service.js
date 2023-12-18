"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("./user.model"));
const save = async (user, session) => {
    if (session) {
        return await user.save({ session });
    }
    else {
        return await user.save();
    }
};
const findByEmail = async (email) => {
    return await user_model_1.default.findOne({ email: email });
};
const findById = async (id) => {
    return await user_model_1.default.findById(id).populate("organization");
};
exports.default = {
    save,
    findByEmail,
    findById,
};
