"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const constant_1 = __importDefault(require("../constant"));
const UserSchema = new mongoose_1.default.Schema({
    googleId: {
        type: String,
        //required: true,
    },
    firstname: {
        type: String,
        required: [true, "first name is required"],
        maxlength: [100, "first name cannot be more than 50 characters"],
    },
    lastname: {
        type: String,
        required: [true, "last name is required"],
        maxlength: [100, "last name cannot be more than 50 characters"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        maxlength: [100, "Email cannot be more than 100 characters"],
        validate: {
            validator: (value) => {
                return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
            },
            message: (props) => `${props.value} is not a valid email`,
        },
    },
    telephone: {
        type: String,
        required: [true, "Telephone is required"],
        unique: true,
        validate: {
            validator: (value) => {
                return /^\d{10}$/g.test(value);
            },
            message: (props) => `${props.value} is not a valid telephone number`,
        },
    },
    address: {
        type: String,
        required: [true, "Address is required"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    role: {
        type: String,
        required: [true, "Role is required"],
        enum: {
            values: [constant_1.default.USER.ROLES.ADMIN, constant_1.default.USER.ROLES.USER],
            message: "Valid roles required",
        },
    },
}, {
    timestamps: true,
    versionKey: false,
});
exports.default = mongoose_1.default.model("User", UserSchema);
