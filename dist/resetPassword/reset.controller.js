"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendVerificationCode = void 0;
const reset_model_1 = __importDefault(require("./reset.model"));
const response_1 = __importDefault(require("../util/response"));
const http_status_codes_1 = require("http-status-codes");
const SendVerificationCode = async (req, res) => {
    const { email: any } = req.body;
    try {
        // Generate a random verification code
        const verificationCode = Math.floor(1000 + Math.random() * 9000).toString();
        // Save the verification code to the user document in the database
        await reset_model_1.default.findOneAndUpdate({ email }, { verificationCode }, { new: true, upsert: true });
        // Send the verification code to the provided email (You'll need to implement email sending logic here)
        // For example, using Nodemailer or any other email sending service
        return (0, response_1.default)(res, true, http_status_codes_1.StatusCodes.OK, "Verification code sent successfully!", { verificationCode } // Send the verification code in the response for testing purposes
        );
    }
    catch (error) {
        // Handle errors here
        console.error(error);
        return (0, response_1.default)(res, false, http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, "Failed to send verification code");
    }
};
exports.SendVerificationCode = SendVerificationCode;
