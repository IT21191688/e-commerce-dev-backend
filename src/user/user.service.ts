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

const findById = async (id: string) => {
  return await User.findById(id).populate("organization");
};

const findByOrganization = async (organization: string) => {
  return await User.findOne({ organization: organization });
};

const findAllAppliedJobs = async (id: string) => {
  return await User.findById(id)
    .populate({
      path: "appliedJobs",
      populate: {
        path: "organization",
        select: "-createdAt -updatedAt -status",
      },
    })
    .populate({
      path: "appliedJobs",
      populate: {
        path: "type",
        select: "-createdAt -updatedAt -status",
      },
    });
};

//find all saved jobs
const findAllSavedJobs = async (id: string) => {
  return await User.findById(id)
    .populate({
      path: "savedJobs",
      populate: {
        path: "organization",
        select: "-createdAt -updatedAt -status",
      },
    })
    .populate({
      path: "savedJobs",
      populate: {
        path: "type",
        select: "-createdAt -updatedAt -status",
      },
    });
};

export default {
  save,
  findByEmail,
  findById,
  findByOrganization,
  findAllAppliedJobs,
  findAllSavedJobs,
};
