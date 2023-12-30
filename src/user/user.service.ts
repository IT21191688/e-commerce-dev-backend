import NotFoundError from "../error/error.classes/NotFoundError";
import User from "./user.model";

const save = async (user: any, session: any) => {
  if (session) {
    return await user.save({ session });
  } else {
    return await user.save();
  }
};

const findByEmail = async (email: string) => {
  return await User.findOne({ email: email });
};

const getAllUsers = async () => {
  return await User.find({});
};

const findById = async (id: string) => {
  return await User.findById(id);
};

const editUserDetails = async (id: string, updatedDetails: any) => {
  return await User.findByIdAndUpdate(id, updatedDetails, { new: true });
};

const resetPassword = async (email: string, newPassword: string) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new NotFoundError("User not found");
  }

  //console.log("===================" + newPassword);

  user.password = newPassword;
  await user.save();
  return user;
};

export default {
  save,
  findByEmail,
  findById,
  getAllUsers,
  editUserDetails,
  resetPassword,
};
