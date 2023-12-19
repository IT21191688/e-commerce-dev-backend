"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindAllReviewsByProductId = exports.FindAllReviewsByUserId = exports.FindOneReviewById = exports.DeleteReview = exports.EditReviewDetails = exports.FindAllReviews = exports.CreateReview = void 0;
const http_status_codes_1 = require("http-status-codes");
const user_service_1 = __importDefault(require("../user/user.service"));
const review_model_1 = __importDefault(require("./review.model"));
const review_service_1 = __importDefault(require("./review.service"));
const response_1 = __importDefault(require("../util/response"));
const NotFoundError_1 = __importDefault(require("../error/error.classes/NotFoundError"));
const ForbiddenError_1 = __importDefault(require("../error/error.classes/ForbiddenError"));
const CreateReview = async (req, res) => {
    const body = req.body;
    const auth = req.auth;
    try {
        const user = await user_service_1.default.findById(auth._id);
        if (!user)
            throw new NotFoundError_1.default("User not found!");
        const newReview = new review_model_1.default({
            userid: auth._id,
            productid: body.productid,
            orderid: body.orderid,
            reviewtext: body.reviewtext,
            rating: body.rating,
        });
        const createdReview = await review_service_1.default.saveReview(newReview, null);
        (0, response_1.default)(res, true, http_status_codes_1.StatusCodes.CREATED, "Review created successfully!", createdReview);
    }
    catch (error) {
        console.error(error);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Error creating review",
            error: error.message,
        });
    }
};
exports.CreateReview = CreateReview;
const FindAllReviews = async (req, res) => {
    try {
        const allReviews = await review_service_1.default.findAllReviews();
        (0, response_1.default)(res, true, http_status_codes_1.StatusCodes.OK, "All reviews retrieved successfully!", allReviews);
    }
    catch (error) {
        console.error(error);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Error retrieving reviews",
            error: error.message,
        });
    }
};
exports.FindAllReviews = FindAllReviews;
const EditReviewDetails = async (req, res) => {
    const auth = req.auth;
    const reviewId = req.params.reviewId; // Assuming the review ID is passed in the URL parameters
    try {
        const review = await review_service_1.default.findReviewById(reviewId);
        if (!review) {
            throw new NotFoundError_1.default("Review not found!");
        }
        //console.log(review.userid + "  ====" + auth._id);
        if (review.userid.toString() !== auth._id.toString()) {
            throw new ForbiddenError_1.default("You are not authorized to edit this review!");
        }
        const updatedDetails = req.body;
        const updatedReview = await review_service_1.default.editReviewDetails(reviewId, updatedDetails);
        (0, response_1.default)(res, true, http_status_codes_1.StatusCodes.OK, "Review updated successfully!", updatedReview);
    }
    catch (error) {
        console.error(error);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Error updating review",
            error: error.message,
        });
    }
};
exports.EditReviewDetails = EditReviewDetails;
const DeleteReview = async (req, res) => {
    const auth = req.auth;
    const reviewId = req.params.reviewId;
    try {
        const review = await review_service_1.default.findReviewById(reviewId);
        if (!review) {
            throw new NotFoundError_1.default("Review not found!");
        }
        if (review.userid.toString() !== auth._id.toString()) {
            throw new ForbiddenError_1.default("You are not authorized to delete this review!");
        }
        await review_service_1.default.deleteReviewById(reviewId);
        (0, response_1.default)(res, true, http_status_codes_1.StatusCodes.OK, "Review deleted successfully!", null);
    }
    catch (error) {
        console.error(error);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Error deleting review",
            error: error.message,
        });
    }
};
exports.DeleteReview = DeleteReview;
const FindOneReviewById = async (req, res) => {
    const reviewId = req.params.reviewId;
    try {
        const review = await review_service_1.default.findReviewById(reviewId);
        if (!review) {
            throw new NotFoundError_1.default("Review not found!");
        }
        (0, response_1.default)(res, true, http_status_codes_1.StatusCodes.OK, "Review retrieved successfully!", review);
    }
    catch (error) {
        console.error(error);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Error retrieving review",
            error: error.message,
        });
    }
};
exports.FindOneReviewById = FindOneReviewById;
const FindAllReviewsByUserId = async (req, res) => {
    const userId = req.params.userId; // Assuming the user ID is passed in the URL parameters
    try {
        const reviews = await review_service_1.default.findReviewsByUserId(userId);
        if (!reviews || reviews.length === 0) {
            throw new NotFoundError_1.default("Reviews not found for this user!");
        }
        (0, response_1.default)(res, true, http_status_codes_1.StatusCodes.OK, "Reviews retrieved successfully!", reviews);
    }
    catch (error) {
        console.error(error);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Error retrieving reviews",
            error: error.message,
        });
    }
};
exports.FindAllReviewsByUserId = FindAllReviewsByUserId;
const FindAllReviewsByProductId = async (req, res) => {
    const productId = req.params.productId; // Assuming the product ID is passed in the URL parameters
    try {
        const reviews = await review_service_1.default.findReviewsByProductId(productId);
        if (!reviews || reviews.length === 0) {
            throw new NotFoundError_1.default("Reviews not found for this product!");
        }
        (0, response_1.default)(res, true, http_status_codes_1.StatusCodes.OK, "Reviews retrieved successfully!", reviews);
    }
    catch (error) {
        console.error(error);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Error retrieving reviews",
            error: error.message,
        });
    }
};
exports.FindAllReviewsByProductId = FindAllReviewsByProductId;
