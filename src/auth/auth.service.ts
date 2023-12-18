import Auth from "./auth.model";

const save = async (auth: any, session: any) => {
  return await auth.save({ session });
};

const findById = async (id: string) => {
  return await Auth.findById(id);
};

export default { save, findById };
