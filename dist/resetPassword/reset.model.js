"use strict";
// user.model.js
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const passwordSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    verificationCode: {
        type: String,
        required: false,
    },
    // Other user fields...
});
const Password = mongoose_1.default.model("Password", passwordSchema);
exports.default = Password;
