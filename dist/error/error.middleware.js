"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const InternalServerError_1 = __importDefault(require("./error.classes/InternalServerError"));
const response_1 = __importDefault(require("../util/response"));
const errorHandlerMiddleware = async (err, req, res, next) => {
    let customError = {
        statusCode: err.statusCode || http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR,
        message: err.message || "Something went wrong!",
        data: {},
    };
    if (err instanceof InternalServerError_1.default ||
        customError.statusCode === http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR) {
        customError.message = "Something went wrong!";
    }
    if (err.name === "ValidationError") {
        let validatorKeyValuePairs = {};
        Object.values(err.errors).forEach((error) => {
            validatorKeyValuePairs[error.properties.path] = error.properties.message;
        });
        customError.statusCode = http_status_codes_1.StatusCodes.BAD_REQUEST;
        customError.message = "Validation Error";
        customError.data = validatorKeyValuePairs;
    }
    if (err.code && err.code === 11000) {
        customError.message = `${Object.keys(err.keyValue)} already exists! Please choose another value.`;
        customError.statusCode = http_status_codes_1.StatusCodes.CONFLICT;
    }
    // handle mongo db cast errors
    if (err.name === "CastError") {
        customError.message = `No item found with ID "${err.value}"!`;
        customError.statusCode = http_status_codes_1.StatusCodes.NOT_FOUND;
    }
    return (0, response_1.default)(res, false, customError.statusCode, customError.message, customError.data);
};
exports.default = errorHandlerMiddleware;
