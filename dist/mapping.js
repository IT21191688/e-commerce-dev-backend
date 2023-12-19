"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_route_1 = __importDefault(require("./auth/auth.route"));
const constant_1 = __importDefault(require("./constant"));
const user_route_1 = __importDefault(require("./user/user.route"));
const product_route_1 = __importDefault(require("./product/product.route"));
const requestMappings = (app) => {
    app.use(constant_1.default.API.PREFIX.concat("/user"), user_route_1.default);
    app.use(constant_1.default.API.PREFIX.concat("/auth"), auth_route_1.default);
    app.use(constant_1.default.API.PREFIX.concat("/product"), product_route_1.default);
};
exports.default = requestMappings;
