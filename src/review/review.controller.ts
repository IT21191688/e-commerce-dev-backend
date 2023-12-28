import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import userService from "../user/user.service";
import Review from "./review.model";
import reviewService from "./review.service";
import CustomResponse from "../util/response";
import NotFoundError from "../error/error.classes/NotFoundError";
import ForbiddenError from "../error/error.classes/ForbiddenError";

const CreateReview = async (req: Request, res: Response) => {
  const body = req.body;
  const auth = req.auth;

  try {
    const user = await userService.findById(auth._id);
    if (!user) throw new NotFoundError("User not found!");

    const newReview = new Review({
      userid: auth._id,
      productid: body.productid,
      orderid: body.orderid,
      reviewtext: body.reviewtext,
      rating: body.rating,
    });

    const createdReview = await reviewService.saveReview(newReview, null);

    CustomResponse(
      res,
      true,
      StatusCodes.CREATED,
      "Review created successfully!",
      createdReview
    );
  } catch (error: any) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Error creating review",
      error: error.message,
    });
  }
};

const FindAllReviews = async (req: Request, res: Response) => {
  try {
    const allReviews = await reviewService.findAllReviews();

    CustomResponse(
      res,
      true,
      StatusCodes.OK,
      "All reviews retrieved successfully!",
      allReviews
    );
  } catch (error: any) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Error retrieving reviews",
      error: error.message,
    });
  }
};

const EditReviewDetails = async (req: Request, res: Response) => {
  const auth: any = req.auth;
  const reviewId = req.params.reviewId; // Assuming the review ID is passed in the URL parameters

  try {
    const review = await reviewService.findReviewById(reviewId);

    if (!review) {
      throw new NotFoundError("Review not found!");
    }

    //console.log(review.userid + "  ====" + auth._id);

    if (review.userid.toString() !== auth._id.toString()) {
      throw new ForbiddenError("You are not authorized to edit this review!");
    }

    const updatedDetails = req.body;
    const updatedReview = await reviewService.editReviewDetails(
      reviewId,
      updatedDetails
    );

    CustomResponse(
      res,
      true,
      StatusCodes.OK,
      "Review updated successfully!",
      updatedReview
    );
  } catch (error: any) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Error updating review",
      error: error.message,
    });
  }
};

const DeleteReview = async (req: Request, res: Response) => {
  const auth: any = req.auth;
  const reviewId = req.params.reviewId;

  try {
    const review = await reviewService.findReviewById(reviewId);

    if (!review) {
      throw new NotFoundError("Review not found!");
    }

    /*
    if (review.userid.toString() !== auth._id.toString()) {
      throw new ForbiddenError("You are not authorized to delete this review!");
    }
*/
    await reviewService.deleteReviewById(reviewId);

    CustomResponse(
      res,
      true,
      StatusCodes.OK,
      "Review deleted successfully!",
      null
    );
  } catch (error: any) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Error deleting review",
      error: error.message,
    });
  }
};

const FindOneReviewById = async (req: Request, res: Response) => {
  const reviewId = req.params.reviewId;

  try {
    const review = await reviewService.findReviewById(reviewId);

    if (!review) {
      throw new NotFoundError("Review not found!");
    }

    CustomResponse(
      res,
      true,
      StatusCodes.OK,
      "Review retrieved successfully!",
      review
    );
  } catch (error: any) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Error retrieving review",
      error: error.message,
    });
  }
};

const FindAllReviewsByUserId = async (req: Request, res: Response) => {
  const userId = req.params.userId; // Assuming the user ID is passed in the URL parameters

  try {
    const reviews = await reviewService.findReviewsByUserId(userId);

    if (!reviews || reviews.length === 0) {
      throw new NotFoundError("Reviews not found for this user!");
    }

    CustomResponse(
      res,
      true,
      StatusCodes.OK,
      "Reviews retrieved successfully!",
      reviews
    );
  } catch (error: any) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Error retrieving reviews",
      error: error.message,
    });
  }
};

const FindAllReviewsByProductId = async (req: Request, res: Response) => {
  const productId = req.params.productId; // Assuming the product ID is passed in the URL parameters

  try {
    const reviews = await reviewService.findReviewsByProductId(productId);

    if (!reviews || reviews.length === 0) {
      throw new NotFoundError("Reviews not found for this product!");
    }

    CustomResponse(
      res,
      true,
      StatusCodes.OK,
      "Reviews retrieved successfully!",
      reviews
    );
  } catch (error: any) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Error retrieving reviews",
      error: error.message,
    });
  }
};

export {
  CreateReview,
  FindAllReviews,
  EditReviewDetails,
  DeleteReview,
  FindOneReviewById,
  FindAllReviewsByUserId,
  FindAllReviewsByProductId,
};
