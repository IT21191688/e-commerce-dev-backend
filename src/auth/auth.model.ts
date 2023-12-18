import mongoose from "mongoose";

const AuthSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      unique: true,
      required: [true, "User is required"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Auth", AuthSchema);
