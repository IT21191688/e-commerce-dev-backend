"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const url = process.env.MONGODB_URI || "";
const connectDB = async () => {
    mongoose_1.default.set("strictQuery", true);
    await mongoose_1.default
        .connect(url)
        .then(() => {
        console.log(`DATABASE CONNECTED..!!`);
    })
        .catch((err) => {
        throw new Error(err);
    });
};
exports.connectDB = connectDB;
