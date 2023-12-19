import Review from "./review.model";

const saveReview = async (review: any, session: any) => {
  if (session) {
    return await review.save({ session });
  } else {
    return await review.save();
  }
};

const findAllReviews = () => {
  return Review.find({});
};

const findReviewsByUserId = (userId: any) => {
  return Review.find({ userid: userId });
};

const findReviewsByProductId = (productId: any) => {
  return Review.find({ productid: productId });
};

const findReviewById = (id: any) => {
  return Review.findOne({ _id: id });
};

const editReviewDetails = async (id: string, updatedDetails: any) => {
  return await Review.findByIdAndUpdate(id, updatedDetails, { new: true });
};

const deleteReviewById = async (reviewId: string) => {
  return await Review.findByIdAndDelete(reviewId);
};

export default {
  saveReview,
  findAllReviews,
  findReviewsByUserId,
  findReviewById,
  editReviewDetails,
  deleteReviewById,
  findReviewsByProductId,
};
