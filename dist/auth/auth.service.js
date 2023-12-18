"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_model_1 = __importDefault(require("./auth.model"));
const save = async (auth, session) => {
    return await auth.save({ session });
};
const findById = async (id) => {
    return await auth_model_1.default.findById(id);
};
exports.default = { save, findById };
