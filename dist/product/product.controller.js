"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindAllProducts = exports.CreateProduct = void 0;
const http_status_codes_1 = require("http-status-codes");
const user_service_1 = __importDefault(require("../user/user.service"));
const product_model_1 = __importDefault(require("./product.model"));
const product_service_1 = __importDefault(require("./product.service"));
const response_1 = __importDefault(require("../util/response"));
const NotFoundError_1 = __importDefault(require("../error/error.classes/NotFoundError"));
const CreateProduct = async (req, res) => {
    const body = req.body;
    const auth = req.auth;
    let createdProduct = null;
    try {
        const user = await user_service_1.default.findById(auth._id);
        if (!user)
            throw new NotFoundError_1.default("User not found!");
        const newProduct = new product_model_1.default({
            productname: body.productname,
            description: body.description,
            productcategory: body.productcategory,
            productprice: body.productprice,
            productqty: body.productqty,
            productimage: body.productimage,
            productstatus: body.productstatus,
            addedBy: auth._id,
        });
        createdProduct = await product_service_1.default.save(newProduct, null);
        (0, response_1.default)(res, true, http_status_codes_1.StatusCodes.CREATED, "Product created successfully!", createdProduct);
    }
    catch (error) {
        // Handle error, such as logging or sending an error response
        console.error(error);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Error creating product",
            error: error.message,
        });
    }
};
exports.CreateProduct = CreateProduct;
const FindAllProducts = async (req, res) => {
    try {
        const allProducts = await product_service_1.default.findAllProduct();
        (0, response_1.default)(res, true, http_status_codes_1.StatusCodes.OK, "All products retrieved successfully!", allProducts);
    }
    catch (error) {
        console.error(error);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Error retrieving products",
            error: error.message,
        });
    }
};
exports.FindAllProducts = FindAllProducts;
