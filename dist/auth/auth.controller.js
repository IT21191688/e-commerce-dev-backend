"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserLogin = void 0;
const auth_service_1 = __importDefault(require("./auth.service"));
const auth_util_1 = __importDefault(require("./auth.util"));
const http_status_codes_1 = require("http-status-codes");
const response_1 = __importDefault(require("../util/response"));
const NotFoundError_1 = __importDefault(require("../error/error.classes/NotFoundError"));
const BadRequestError_1 = __importDefault(require("../error/error.classes/BadRequestError"));
const UserLogin = async (req, res) => {
    const body = req.body;
    if (!body.email || !body.password) {
        throw new BadRequestError_1.default("Email and password are required");
    }
    const isAuthCheck = await auth_service_1.default.findById(body.email);
    if (!isAuthCheck)
        throw new NotFoundError_1.default("Invalid email!");
    //compare password
    const isPasswordMatch = await auth_util_1.default.comparePassword(body.password, isAuthCheck.password);
    if (!isPasswordMatch)
        throw new BadRequestError_1.default("Invalid password!");
    //get user
    const populateUser = await isAuthCheck.populate("user");
    const token = auth_util_1.default.signToken(populateUser.user);
    let user = {
        fullName: populateUser.user.fullName,
        email: populateUser.user.email,
        role: populateUser.user.role,
    };
    (0, response_1.default)(res, true, http_status_codes_1.StatusCodes.OK, "Log in successfully!", {
        token,
        user: user,
    });
};
exports.UserLogin = UserLogin;
