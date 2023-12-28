import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema(
  {
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    productid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: false,
    },
    orderid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    reviewtext: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Review", ReviewSchema);
