import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    transactionDetails: {
      creditCardNumber: {
        type: String,
        required: true,
      },
      csv: {
        type: String,
        required: true,
      },
      amount: {
        type: Number,
        required: true,
      },
    },
    paymentDate: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      required: true,
      default: "Pending", // Default status as "Pending"
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Payment", PaymentSchema);
