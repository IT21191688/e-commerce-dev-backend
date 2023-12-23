"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const contact_model_1 = __importDefault(require("./contact.model"));
const saveContact = async (contactDetails, userId) => {
    const newContact = new contact_model_1.default({
        ...contactDetails,
        userId,
    });
    return await newContact.save();
};
const findAllContacts = () => {
    return contact_model_1.default.find({}).populate("userId");
};
const findContactById = (id) => {
    return contact_model_1.default.findById(id).exec();
};
const updateContact = async (id, updatedDetails) => {
    return contact_model_1.default.findByIdAndUpdate(id, updatedDetails, { new: true }).exec();
};
const deleteContactById = async (id) => {
    return contact_model_1.default.findByIdAndDelete(id).exec();
};
exports.default = {
    saveContact,
    findAllContacts,
    findContactById,
    updateContact,
    deleteContactById,
};
