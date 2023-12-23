import Contact from "./contact.model";

const saveContact = async (contactDetails: any, userId: string) => {
  const newContact = new Contact({
    ...contactDetails,
    userId,
  });
  return await newContact.save();
};

const findAllContacts = () => {
  return Contact.find({}).exec();
};

const findContactById = (id: string) => {
  return Contact.findById(id).exec();
};

const updateContact = async (id: string, updatedDetails: any) => {
  return Contact.findByIdAndUpdate(id, updatedDetails, { new: true }).exec();
};

const deleteContactById = async (id: string) => {
  return Contact.findByIdAndDelete(id).exec();
};

export default {
  saveContact,
  findAllContacts,
  findContactById,
  updateContact,
  deleteContactById,
};
