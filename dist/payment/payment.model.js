"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const PaymentSchema = new mongoose_1.default.Schema({
    orderId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Order",
        required: true,
    },
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    paymentMethod: {
        type: String,
        required: true,
    },
    transactionDetails: {
        creditCardNumber: {
            type: String,
            required: true,
        },
        csv: {
            type: String,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
    },
    paymentDate: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        required: true,
        default: "Pending", // Default status as "Pending"
    },
}, {
    timestamps: true,
    versionKey: false,
});
exports.default = mongoose_1.default.model("Payment", PaymentSchema);
