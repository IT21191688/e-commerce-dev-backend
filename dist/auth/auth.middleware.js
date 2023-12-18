"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_util_1 = __importDefault(require("./auth.util"));
const UnauthorizedError_1 = __importDefault(require("../error/error.classes/UnauthorizedError"));
const ForbiddenError_1 = __importDefault(require("../error/error.classes/ForbiddenError"));
const authorize = (rolesArray = []) => {
    if (!rolesArray)
        rolesArray = [];
    return async (req, res, next) => {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw new UnauthorizedError_1.default("Authentication invalid!");
        }
        const token = auth_util_1.default.extractToken(authHeader);
        if (token) {
            let payload = null;
            try {
                payload = auth_util_1.default.verifyToken(token);
            }
            catch (error) {
                if (error instanceof jsonwebtoken_1.default.TokenExpiredError)
                    throw new UnauthorizedError_1.default("Your session is expired!");
                return next(new UnauthorizedError_1.default(`You're unauthorized to access this resource!`));
            }
            if (rolesArray.length && !rolesArray.includes(payload.role)) {
                return next(new ForbiddenError_1.default(`You're unauthorized to access this resource!`));
            }
            req.auth = payload;
            return next();
        }
        else {
            return next(new UnauthorizedError_1.default("You're unauthorized to access this resource!"));
        }
    };
};
exports.default = { authorize };
