"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_route_1 = __importDefault(require("./auth/auth.route"));
const constant_1 = __importDefault(require("./constant"));
const user_route_1 = __importDefault(require("./user/user.route"));
const product_route_1 = __importDefault(require("./product/product.route"));
const order_route_1 = __importDefault(require("./order/order.route"));
const review_route_1 = __importDefault(require("./review/review.route"));
const cart_route_1 = __importDefault(require("./cart/cart.route"));
const payment_route_1 = __importDefault(require("./payment/payment.route"));
const contact_route_1 = __importDefault(require("./contact/contact.route"));
const requestMappings = (app) => {
    app.use(constant_1.default.API.PREFIX.concat("/user"), user_route_1.default);
    app.use(constant_1.default.API.PREFIX.concat("/auth"), auth_route_1.default);
    app.use(constant_1.default.API.PREFIX.concat("/product"), product_route_1.default);
    app.use(constant_1.default.API.PREFIX.concat("/order"), order_route_1.default);
    app.use(constant_1.default.API.PREFIX.concat("/review"), review_route_1.default);
    app.use(constant_1.default.API.PREFIX.concat("/cart"), cart_route_1.default);
    app.use(constant_1.default.API.PREFIX.concat("/payment"), payment_route_1.default);
    app.use(constant_1.default.API.PREFIX.concat("/contact"), contact_route_1.default);
};
exports.default = requestMappings;
