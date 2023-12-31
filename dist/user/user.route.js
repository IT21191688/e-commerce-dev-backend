"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = __importDefault(require("../auth/auth.middleware"));
const user_controller_1 = require("./user.controller");
const constant_1 = __importDefault(require("../constant"));
const UserRouter = (0, express_1.Router)();
UserRouter.post("/register", user_controller_1.RegisterUser);
UserRouter.get("/profile", auth_middleware_1.default.authorize([
    constant_1.default.USER.ROLES.ADMIN,
    constant_1.default.USER.ROLES.USER,
]), user_controller_1.GetUserProfile);
UserRouter.post("/sendVerificationCode", user_controller_1.SendVerificationCode);
UserRouter.post("/resetPassword", user_controller_1.ResetPassword);
UserRouter.get("/getAllUser", auth_middleware_1.default.authorize([constant_1.default.USER.ROLES.ADMIN]), user_controller_1.GetAllUsers);
UserRouter.post("/updateUser", auth_middleware_1.default.authorize([
    constant_1.default.USER.ROLES.ADMIN,
    constant_1.default.USER.ROLES.USER,
]), user_controller_1.EditUserDetails);
UserRouter.post("/updateUser/:userId", auth_middleware_1.default.authorize([constant_1.default.USER.ROLES.ADMIN]), user_controller_1.EditUserDetailsUserId); //
exports.default = UserRouter;
