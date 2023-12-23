"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const OrderScema = new mongoose_1.default.Schema({
    userid: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
    },
    paymentid: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Payment",
    },
    products: [
        {
            productid: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: "Product",
            },
            quantity: {
                type: Number,
                required: [true, "Quantity is Required"],
            },
        },
    ],
    deliveryaddress: {
        type: String,
        required: [true, "address is required!"],
    },
    orderdate: {
        type: Date,
        required: [true, "Order Data is required!"],
    },
    orderstatus: {
        type: String,
        required: [true, "productstatus is required!"],
    },
}, {
    timestamps: true,
    versionKey: false,
});
exports.default = mongoose_1.default.model("Order", OrderScema);
