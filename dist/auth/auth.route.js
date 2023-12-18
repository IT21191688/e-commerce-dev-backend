"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const AuthRouter = (0, express_1.Router)();
AuthRouter.post("/login", auth_controller_1.UserLogin);
exports.default = AuthRouter;
