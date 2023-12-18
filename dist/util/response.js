"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CustomResponse = (res, isSuccessful, statusCode, message, data) => {
    let timeStamp = new Date().toISOString();
    return res
        .status(statusCode)
        .json({ isSuccessful, timeStamp, message, data });
};
exports.default = CustomResponse;
