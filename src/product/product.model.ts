import mongoose from "mongoose";
import constants from "../constant";

const ProductScema = new mongoose.Schema(
  {
    productname: {
      type: String,
      required: [true, "Productname is required!"],
    },

    description: {
      type: String,
      maxlength: [500, "Description cannot be more than 500 characters!"],
    },

    productcategory: {
      type: String,
      required: [true, "productcategory is Required"],
    },

    productprice: {
      type: Number,
      required: [true, "productprice is required!"],
    },

    productqty: {
      type: Number,
      required: [true, "productqty is required!"],
    },

    productimage: {
      type: String,
      required: [true, "productimage is required!"],
    },

    productstatus: {
      type: String,
      required: [true, "productstatus is required!"],
    },
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Product", ProductScema);
