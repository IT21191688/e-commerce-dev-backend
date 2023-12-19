import { Router } from "express";
import authMiddleware from "../auth/auth.middleware";
import constants from "../constant";
import {
  CreateReview,
  FindAllReviews,
  EditReviewDetails,
  DeleteReview,
  FindOneReviewById,
  FindAllReviewsByUserId,
  FindAllReviewsByProductId,
} from "./review.controller";

const ReviewRouter = Router();

ReviewRouter.post(
  "/createReview",
  authMiddleware.authorize([
    constants.USER.ROLES.USER,
    constants.USER.ROLES.ADMIN,
  ]),
  CreateReview
);

ReviewRouter.get(
  "/getAllReviews",
  authMiddleware.authorize([
    constants.USER.ROLES.ADMIN,
    constants.USER.ROLES.USER,
  ]),
  FindAllReviews
);

ReviewRouter.patch(
  "/updateReview/:reviewId",
  authMiddleware.authorize([
    constants.USER.ROLES.USER,
    constants.USER.ROLES.ADMIN,
  ]),
  EditReviewDetails
);

ReviewRouter.delete(
  "/deleteReview/:reviewId",
  authMiddleware.authorize([
    constants.USER.ROLES.USER,
    constants.USER.ROLES.ADMIN,
  ]),
  DeleteReview
);

ReviewRouter.get(
  "/getOneReview/:reviewId",
  authMiddleware.authorize([
    constants.USER.ROLES.ADMIN,
    constants.USER.ROLES.USER,
  ]),
  FindOneReviewById
);

ReviewRouter.get(
  "/getAllReviewsByUser/:userId",
  authMiddleware.authorize([
    constants.USER.ROLES.ADMIN,
    constants.USER.ROLES.USER,
  ]),
  FindAllReviewsByUserId
);

ReviewRouter.get(
  "/getAllReviewsByProduct/:productId",
  authMiddleware.authorize([
    constants.USER.ROLES.ADMIN,
    constants.USER.ROLES.USER,
  ]),
  FindAllReviewsByProductId
);

export default ReviewRouter;
