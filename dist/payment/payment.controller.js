"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RetrieveAllUserPayments = exports.RetrievePaymentDetailsUsingId = exports.RetrieveAllPayments = exports.CreatePayment = void 0;
const http_status_codes_1 = require("http-status-codes");
const payment_service_1 = __importDefault(require("./payment.service"));
const response_1 = __importDefault(require("../util/response"));
const user_service_1 = __importDefault(require("../user/user.service"));
const NotFoundError_1 = __importDefault(require("../error/error.classes/NotFoundError"));
const CreatePayment = async (req, res) => {
    const body = req.body;
    const auth = req.auth;
    //console.log(body);
    const paymentDetails = {
        userId: auth._id,
        paymentMethod: body.paymentMethod,
        transactionDetails: body.transactionDetails,
        paymentDate: body.paymentDate,
        status: body.status,
    };
    const user = await user_service_1.default.findById(auth._id);
    if (!user) {
        throw new NotFoundError_1.default("User not found!");
    }
    try {
        const createdPayment = await payment_service_1.default.createPayment(paymentDetails);
        (0, response_1.default)(res, true, http_status_codes_1.StatusCodes.CREATED, "Payment created successfully!", createdPayment);
    }
    catch (error) {
        console.error(error);
        (0, response_1.default)(res, false, http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, "Error creating payment", error.message);
    }
};
exports.CreatePayment = CreatePayment;
const RetrieveAllPayments = async (req, res) => {
    const auth = req.auth;
    const user = await user_service_1.default.findById(auth._id);
    if (!user) {
        throw new NotFoundError_1.default("User not found!");
    }
    try {
        const allPayments = await payment_service_1.default.retrieveAllPayments();
        (0, response_1.default)(res, true, http_status_codes_1.StatusCodes.OK, "All payments retrieved successfully!", allPayments);
    }
    catch (error) {
        console.error(error);
        (0, response_1.default)(res, false, http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, "Error retrieving payments", error.message);
    }
};
exports.RetrieveAllPayments = RetrieveAllPayments;
const RetrievePaymentDetailsUsingId = async (req, res) => {
    const paymentId = req.params.paymentId;
    const auth = req.auth;
    const user = await user_service_1.default.findById(auth._id);
    if (!user) {
        throw new NotFoundError_1.default("User not found!");
    }
    try {
        const paymentDetails = await payment_service_1.default.retrievePaymentDetailsById(paymentId);
        (0, response_1.default)(res, true, http_status_codes_1.StatusCodes.OK, "Payment details retrieved successfully!", paymentDetails);
    }
    catch (error) {
        console.error(error);
        (0, response_1.default)(res, false, http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, "Error retrieving payment details", error.message);
    }
};
exports.RetrievePaymentDetailsUsingId = RetrievePaymentDetailsUsingId;
const RetrieveAllUserPayments = async (req, res) => {
    const userId = req.params.userId;
    const auth = req.auth;
    const user = await user_service_1.default.findById(auth._id);
    if (!user) {
        throw new NotFoundError_1.default("User not found!");
    }
    try {
        const userPayments = await payment_service_1.default.retrieveAllUserPayments(userId);
        (0, response_1.default)(res, true, http_status_codes_1.StatusCodes.OK, "User payments retrieved successfully!", userPayments);
    }
    catch (error) {
        console.error(error);
        (0, response_1.default)(res, false, http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, "Error retrieving user payments", error.message);
    }
};
exports.RetrieveAllUserPayments = RetrieveAllUserPayments;
