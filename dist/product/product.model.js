"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ProductScema = new mongoose_1.default.Schema({
    productname: {
        type: String,
        required: [true, "Productname is required!"],
    },
    description: {
        type: String,
        maxlength: [500, "Description cannot be more than 500 characters!"],
    },
    productcategory: {
        type: String,
        required: [true, "productcategory is Required"],
    },
    productprice: {
        type: Number,
        required: [true, "productprice is required!"],
    },
    productqty: {
        type: Number,
        required: [true, "productqty is required!"],
    },
    productimage: {
        type: String,
        required: [true, "productimage is required!"],
    },
    productstatus: {
        type: String,
        required: [true, "productstatus is required!"],
    },
    addedBy: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
    },
}, {
    timestamps: true,
    versionKey: false,
});
exports.default = mongoose_1.default.model("Product", ProductScema);
