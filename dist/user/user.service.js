"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const NotFoundError_1 = __importDefault(require("../error/error.classes/NotFoundError"));
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
const getAllUsers = async () => {
    return await user_model_1.default.find({});
};
const findById = async (id) => {
    return await user_model_1.default.findById(id);
};
const editUserDetails = async (id, updatedDetails) => {
    return await user_model_1.default.findByIdAndUpdate(id, updatedDetails, { new: true });
};
const resetPassword = async (email, newPassword) => {
    const user = await user_model_1.default.findOne({ email });
    if (!user) {
        throw new NotFoundError_1.default("User not found");
    }
    user.password = newPassword;
    await user.save();
    return user;
};
exports.default = {
    save,
    findByEmail,
    findById,
    getAllUsers,
    editUserDetails,
    resetPassword,
};
