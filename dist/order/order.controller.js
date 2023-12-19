"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindAllOrdersByUserId = exports.FindOneOrderById = exports.DeleteOrder = exports.EditOrderDetails = exports.FindAllOrders = exports.CreateOrder = void 0;
const http_status_codes_1 = require("http-status-codes");
const user_service_1 = __importDefault(require("../user/user.service"));
const product_service_1 = __importDefault(require("../product/product.service"));
const order_model_1 = __importDefault(require("./order.model"));
const order_service_1 = __importDefault(require("./order.service"));
const response_1 = __importDefault(require("../util/response"));
const NotFoundError_1 = __importDefault(require("../error/error.classes/NotFoundError"));
const ForbiddenError_1 = __importDefault(require("../error/error.classes/ForbiddenError"));
const emailServer_1 = require("../util/emailServer");
const email_templates_1 = __importDefault(require("../util/email-templates/email.templates"));
const CreateOrder = async (req, res) => {
    try {
        const auth = req.auth;
        const { productid, paymentid, quentity, totalprice, deliveryaddress, orderdate, orderstatus, } = req.body;
        console.log(quentity);
        const user = await user_service_1.default.findById(auth._id);
        if (!user) {
            throw new NotFoundError_1.default("User not found!");
        }
        const product = await product_service_1.default.findById(productid);
        if (!product) {
            throw new NotFoundError_1.default("Product not found!");
        }
        const newOrder = new order_model_1.default({
            userid: auth._id,
            productid,
            paymentid,
            quentity,
            totalprice,
            deliveryaddress,
            orderdate,
            orderstatus,
        });
        const createdOrder = await order_service_1.default.save(newOrder, null);
        if (createdOrder != null) {
            const subject = "Order Success";
            const htmlBody = email_templates_1.default.OrderPlacedEmail({
                fullName: user.firstname + " " + user.lastname,
                orderId: createdOrder._id,
                orderDate: createdOrder.orderdate,
                totalAmount: createdOrder.totalprice,
            });
            // Send email to the user's email address
            await (0, emailServer_1.sendEmail)(user.email, subject, htmlBody, null);
        }
        (0, response_1.default)(res, true, http_status_codes_1.StatusCodes.CREATED, "Order created successfully!", createdOrder);
    }
    catch (error) {
        console.error(error);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Error creating order",
            error: error.message,
        });
    }
};
exports.CreateOrder = CreateOrder;
const FindAllOrders = async (req, res) => {
    const auth = req.auth;
    const user = await user_service_1.default.findById(auth._id);
    if (!user) {
        throw new NotFoundError_1.default("User not found!");
    }
    try {
        const allOrders = await order_service_1.default.findAllOrders();
        (0, response_1.default)(res, true, http_status_codes_1.StatusCodes.OK, "All orders retrieved successfully!", allOrders);
    }
    catch (error) {
        console.error(error);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Error retrieving orders",
            error: error.message,
        });
    }
};
exports.FindAllOrders = FindAllOrders;
const EditOrderDetails = async (req, res) => {
    try {
        const auth = req.auth;
        const orderId = req.params.orderId;
        const order = await order_service_1.default.findById(orderId);
        if (!order) {
            throw new NotFoundError_1.default("Order not found!");
        }
        if (auth.role !== "admin") {
            throw new ForbiddenError_1.default("You are not authorized to update order status!");
        }
        const updatedDetails = req.body;
        const updatedOrder = await order_service_1.default.editOrderDetails(orderId, updatedDetails);
        (0, response_1.default)(res, true, http_status_codes_1.StatusCodes.OK, "Order details updated successfully!", updatedOrder);
    }
    catch (error) {
        console.error(error);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Error updating order details",
            error: error.message,
        });
    }
};
exports.EditOrderDetails = EditOrderDetails;
const DeleteOrder = async (req, res) => {
    try {
        const auth = req.auth;
        const orderId = req.params.orderId;
        const order = await order_service_1.default.findById(orderId);
        if (!order) {
            throw new NotFoundError_1.default("Order not found!");
        }
        if (auth.role !== "admin") {
            throw new ForbiddenError_1.default("You are not authorized to delete this order!");
        }
        await order_service_1.default.deleteOrderById(orderId);
        (0, response_1.default)(res, true, http_status_codes_1.StatusCodes.OK, "Order deleted successfully!", null);
    }
    catch (error) {
        console.error(error);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Error deleting order",
            error: error.message,
        });
    }
};
exports.DeleteOrder = DeleteOrder;
const FindOneOrderById = async (req, res) => {
    const auth = req.auth;
    const user = await user_service_1.default.findById(auth._id);
    if (!user) {
        throw new NotFoundError_1.default("User not found!");
    }
    try {
        const orderId = req.params.orderId;
        const order = await order_service_1.default.findById(orderId);
        if (!order) {
            throw new NotFoundError_1.default("Order not found!");
        }
        (0, response_1.default)(res, true, http_status_codes_1.StatusCodes.OK, "Order retrieved successfully!", order);
    }
    catch (error) {
        console.error(error);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Error retrieving order",
            error: error.message,
        });
    }
};
exports.FindOneOrderById = FindOneOrderById;
const FindAllOrdersByUserId = async (req, res) => {
    const auth = req.auth;
    const user = await user_service_1.default.findById(auth._id);
    if (!user) {
        throw new NotFoundError_1.default("User not found!");
    }
    try {
        const userId = auth._id;
        const orders = await order_service_1.default.findOrdersByUserId(userId);
        (0, response_1.default)(res, true, http_status_codes_1.StatusCodes.OK, "All orders retrieved successfully!", orders);
    }
    catch (error) {
        console.error(error);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Error retrieving orders",
            error: error.message,
        });
    }
};
exports.FindAllOrdersByUserId = FindAllOrdersByUserId;
