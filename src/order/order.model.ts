import mongoose from "mongoose";
import constants from "../constant";

const OrderScema = new mongoose.Schema(
  {
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    paymentid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payment",
    },

    products: [
      {
        productid: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: {
          type: Number,
          required: [true, "Quantity is Required"],
        },
      },
    ],

    deliveryaddress: {
      type: String,
      required: [true, "address is required!"],
    },

    orderdate: {
      type: Date,
      required: [true, "Order Data is required!"],
    },

    orderstatus: {
      type: String,
      required: [true, "productstatus is required!"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Order", OrderScema);
