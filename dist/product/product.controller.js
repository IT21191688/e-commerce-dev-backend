"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReduceProductQuantity = exports.FindOneProductById = exports.DeleteProduct = exports.EditProductDetails = exports.FindAllProducts = exports.CreateProduct = void 0;
const http_status_codes_1 = require("http-status-codes");
const user_service_1 = __importDefault(require("../user/user.service"));
const product_model_1 = __importDefault(require("./product.model"));
const product_service_1 = __importDefault(require("./product.service"));
const response_1 = __importDefault(require("../util/response"));
const NotFoundError_1 = __importDefault(require("../error/error.classes/NotFoundError"));
const constant_1 = __importDefault(require("../constant"));
const BadRequestError_1 = __importDefault(require("../error/error.classes/BadRequestError"));
const ForbiddenError_1 = __importDefault(require("../error/error.classes/ForbiddenError"));
const common_service_1 = __importDefault(require("../common/common.service"));
const CreateProduct = async (req, res) => {
    const body = req.body;
    const auth = req.auth;
    let file = req.file;
    if (!file) {
        throw new BadRequestError_1.default("News image is required!");
    }
    console.log(body);
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
            productstatus: body.productstatus,
            addedBy: auth._id,
        });
        let uploadedObj = null;
        if (file) {
            uploadedObj = await common_service_1.default.uploadImageAndGetUri(file, constant_1.default.CLOUDINARY.FILE_NAME + "/product");
        }
        if (uploadedObj != null) {
            newProduct.productimage = uploadedObj.uri.toString();
            // console.log(uploadedObj.uri.toString());
        }
        createdProduct = await product_service_1.default.save(newProduct, null);
        (0, response_1.default)(res, true, http_status_codes_1.StatusCodes.CREATED, "Product created successfully!", createdProduct);
    }
    catch (error) {
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
const EditProductDetails = async (req, res) => {
    const auth = req.auth;
    const productId = req.params.productId; // Assuming the product ID is passed in the URL parameters
    try {
        const product = await product_service_1.default.findById(productId);
        if (!product) {
            throw new NotFoundError_1.default("Product not found!");
        }
        if (!product.addedBy ||
            product.addedBy.toString() !== auth._id.toString()) {
            throw new ForbiddenError_1.default("You are not authorized to edit this product!");
        }
        const updatedDetails = req.body;
        const updatedProduct = await product_service_1.default.editProductDetails(productId, updatedDetails);
        (0, response_1.default)(res, true, http_status_codes_1.StatusCodes.OK, "Product updated successfully!", updatedProduct);
    }
    catch (error) {
        console.error(error);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Error updating product",
            error: error.message,
        });
    }
};
exports.EditProductDetails = EditProductDetails;
const DeleteProduct = async (req, res) => {
    const auth = req.auth;
    const productId = req.params.productId;
    try {
        const product = await product_service_1.default.findById(productId);
        if (!product) {
            throw new NotFoundError_1.default("Product not found!");
        }
        /*
        if (
          !product.addedBy ||
          product.addedBy.toString() !== auth._id.toString()
        ) {
          throw new ForbiddenError("You are not authorized to edit this product!");
        }
    
        */
        await product_service_1.default.deleteProductById(productId);
        (0, response_1.default)(res, true, http_status_codes_1.StatusCodes.OK, "Product deleted successfully!", null);
    }
    catch (error) {
        console.error(error);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Error deleting product",
            error: error.message,
        });
    }
};
exports.DeleteProduct = DeleteProduct;
const FindOneProductById = async (req, res) => {
    const auth = req.auth;
    const productId = req.params.productId;
    const user = await user_service_1.default.findById(auth._id);
    if (!user)
        throw new NotFoundError_1.default("User not found!");
    try {
        const product = await product_service_1.default.findById(productId);
        if (!product) {
            throw new NotFoundError_1.default("Product not found!");
        }
        (0, response_1.default)(res, true, http_status_codes_1.StatusCodes.OK, "Product retrieved successfully!", product);
    }
    catch (error) {
        console.error(error);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Error retrieving product",
            error: error.message,
        });
    }
};
exports.FindOneProductById = FindOneProductById;
const ReduceProductQuantity = async (productId, quantityToReduce) => {
    try {
        const product = await product_model_1.default.findById(productId);
        if (!product) {
            throw new NotFoundError_1.default(`Product not found for ID: ${productId}`);
        }
        const newProductQty = product.productqty - quantityToReduce;
        const updatedProduct = await product_model_1.default.findByIdAndUpdate(productId, { productqty: newProductQty }, { new: true });
        //console.log(updatedProduct);
        return updatedProduct;
    }
    catch (error) {
        throw new Error(`Error while updating product quantity: ${error.message}`);
    }
};
exports.ReduceProductQuantity = ReduceProductQuantity;
