"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const review_model_1 = __importDefault(require("./review.model"));
const saveReview = async (review, session) => {
    if (session) {
        return await review.save({ session });
    }
    else {
        return await review.save();
    }
};
const findAllReviews = () => {
    return review_model_1.default.find({}).populate("userid");
};
const findReviewsByUserId = (userId) => {
    return review_model_1.default.find({ userid: userId });
};
const findReviewsByProductId = (productId) => {
    return review_model_1.default.find({ productid: productId });
};
const findReviewById = (id) => {
    return review_model_1.default.findOne({ _id: id });
};
const editReviewDetails = async (id, updatedDetails) => {
    return await review_model_1.default.findByIdAndUpdate(id, updatedDetails, { new: true });
};
const deleteReviewById = async (reviewId) => {
    return await review_model_1.default.findByIdAndDelete(reviewId);
};
exports.default = {
    saveReview,
    findAllReviews,
    findReviewsByUserId,
    findReviewById,
    editReviewDetails,
    deleteReviewById,
    findReviewsByProductId,
};
