"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const JWT_SECRET = process.env.JWT_SECRET || "";
const signToken = (user) => {
    let maxAge = 60 * 60 * 24 * 7; // 1 week
    const tokenBody = {
        _id: user._id,
        email: user.email,
        role: user.role,
    };
    return jsonwebtoken_1.default.sign(tokenBody, JWT_SECRET, {
        expiresIn: maxAge,
    });
};
const extractToken = (token) => {
    let tokenArray = token.split(" ");
    if (tokenArray.length !== 2)
        return null;
    return tokenArray[1];
};
const verifyToken = (token) => {
    return jsonwebtoken_1.default.verify(token, JWT_SECRET);
};
const comparePassword = async (password, hash) => {
    return await bcryptjs_1.default.compare(password, hash);
};
exports.default = { signToken, extractToken, comparePassword, verifyToken };
