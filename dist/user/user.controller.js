"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditUserDetails = exports.GetAllUsers = exports.GetUserProfile = exports.RegisterUser = void 0;
const user_util_1 = __importDefault(require("./user.util"));
const user_service_1 = __importDefault(require("./user.service"));
const user_model_1 = __importDefault(require("./user.model"));
const auth_model_1 = __importDefault(require("../auth/auth.model"));
const http_status_codes_1 = require("http-status-codes");
const mongoose_1 = require("mongoose");
const response_1 = __importDefault(require("../util/response"));
const emailServer_1 = require("../util/emailServer");
const email_templates_1 = __importDefault(require("../util/email-templates/email.templates"));
// Import custom errors
const NotFoundError_1 = __importDefault(require("../error/error.classes/NotFoundError"));
const BadRequestError_1 = __importDefault(require("../error/error.classes/BadRequestError"));
const RegisterUser = async (req, res) => {
    const body = req.body;
    const user = new user_model_1.default(body.user);
    //console.log(user.email);
    const existingUser = await user_service_1.default.findByEmail(user.email);
    if (existingUser) {
        throw new BadRequestError_1.default("User already exists!");
    }
    const auth = new auth_model_1.default();
    auth._id = user.email;
    auth.password = await user_util_1.default.hashPassword(body.user.password);
    auth.user = user._id;
    let createdUser = null;
    const session = await (0, mongoose_1.startSession)();
    try {
        session.startTransaction();
        createdUser = await user_service_1.default.save(user, session);
        if (createdUser != null) {
            // Prepare and send email content
            const subject = "Registe Success";
            const htmlBody = email_templates_1.default.UserRegisteredEmail({
                fullName: createdUser.firstname + " " + createdUser.lastname,
            });
            // Send email to the student's email address
            await (0, emailServer_1.sendEmail)(user.email, subject, htmlBody, null);
        }
        await user_service_1.default.save(auth, session);
        await session.commitTransaction();
    }
    catch (e) {
        await session.abortTransaction();
        throw e;
    }
    finally {
        //end session
        session.endSession();
    }
    return (0, response_1.default)(res, true, http_status_codes_1.StatusCodes.CREATED, "User registered successfully!", createdUser);
};
exports.RegisterUser = RegisterUser;
const GetUserProfile = async (req, res) => {
    const auth = req.auth;
    //console.log(auth);
    const user = await user_service_1.default.findById(auth._id);
    //console.log(user + "====");
    if (!user) {
        throw new NotFoundError_1.default("User not found!");
    }
    return (0, response_1.default)(res, true, http_status_codes_1.StatusCodes.OK, "Profile fetched successfully!", user);
};
exports.GetUserProfile = GetUserProfile;
const GetAllUsers = async (req, res) => {
    const auth = req.auth;
    const user = await user_service_1.default.findById(auth._id);
    if (!user) {
        throw new NotFoundError_1.default("User not found!");
    }
    const users = await user_service_1.default.getAllUsers();
    return (0, response_1.default)(res, true, http_status_codes_1.StatusCodes.OK, "All Users fetched successfully!", users);
};
exports.GetAllUsers = GetAllUsers;
const EditUserDetails = async (req, res) => {
    const auth = req.auth;
    const user = await user_service_1.default.findById(auth._id);
    if (!user) {
        throw new NotFoundError_1.default("User not found!");
    }
    const userId = auth._id;
    const updatedDetails = req.body;
    const updatedUser = await user_service_1.default.editUserDetails(userId, updatedDetails);
    return (0, response_1.default)(res, true, http_status_codes_1.StatusCodes.OK, "Edit User successfully!", updatedUser);
};
exports.EditUserDetails = EditUserDetails;
const ResetPassword = async (req, res) => {
    const { email, newPassword } = req.body;
    const updatedUser = await user_service_1.default.resetPassword(email, newPassword);
    // Handle response accordingly
};
