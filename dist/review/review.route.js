"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = __importDefault(require("../auth/auth.middleware"));
const constant_1 = __importDefault(require("../constant"));
const review_controller_1 = require("./review.controller");
const ReviewRouter = (0, express_1.Router)();
ReviewRouter.post("/createReview", auth_middleware_1.default.authorize([
    constant_1.default.USER.ROLES.USER,
    constant_1.default.USER.ROLES.ADMIN,
]), review_controller_1.CreateReview);
ReviewRouter.get("/getAllReviews", auth_middleware_1.default.authorize([
    constant_1.default.USER.ROLES.ADMIN,
    constant_1.default.USER.ROLES.USER,
]), review_controller_1.FindAllReviews);
ReviewRouter.patch("/updateReview/:reviewId", auth_middleware_1.default.authorize([
    constant_1.default.USER.ROLES.USER,
    constant_1.default.USER.ROLES.ADMIN,
]), review_controller_1.EditReviewDetails);
ReviewRouter.delete("/deleteReview/:reviewId", auth_middleware_1.default.authorize([
    constant_1.default.USER.ROLES.USER,
    constant_1.default.USER.ROLES.ADMIN,
]), review_controller_1.DeleteReview);
ReviewRouter.get("/getOneReview/:reviewId", auth_middleware_1.default.authorize([
    constant_1.default.USER.ROLES.ADMIN,
    constant_1.default.USER.ROLES.USER,
]), review_controller_1.FindOneReviewById);
ReviewRouter.get("/getAllReviewsByUser/:userId", auth_middleware_1.default.authorize([
    constant_1.default.USER.ROLES.ADMIN,
    constant_1.default.USER.ROLES.USER,
]), review_controller_1.FindAllReviewsByUserId);
ReviewRouter.get("/getAllReviewsByProduct/:productId", auth_middleware_1.default.authorize([
    constant_1.default.USER.ROLES.ADMIN,
    constant_1.default.USER.ROLES.USER,
]), review_controller_1.FindAllReviewsByProductId);
exports.default = ReviewRouter;
