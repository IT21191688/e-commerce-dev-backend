"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const hashPassword = async (password) => {
    let salt = await bcryptjs_1.default.genSalt(parseInt(process.env.SALT_ROUNDS || "10"));
    return await bcryptjs_1.default.hash(password, salt);
};
exports.default = { hashPassword };
