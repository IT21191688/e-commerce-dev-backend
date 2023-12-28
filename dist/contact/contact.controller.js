"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteContact = exports.EditContact = exports.FindAllContacts = exports.CreateContact = void 0;
const http_status_codes_1 = require("http-status-codes");
const contact_service_1 = __importDefault(require("./contact.service"));
const response_1 = __importDefault(require("../util/response"));
const user_service_1 = __importDefault(require("../user/user.service"));
const NotFoundError_1 = __importDefault(require("../error/error.classes/NotFoundError"));
const CreateContact = async (req, res) => {
    const auth = req.auth;
    const { title, message, status } = req.body;
    const user = await user_service_1.default.findById(auth._id);
    if (!user)
        throw new NotFoundError_1.default("User not found!");
    const userEmail = user.email;
    const userId = auth._id;
    //console.log(title + message + status);
    try {
        const createdContact = await contact_service_1.default.saveContact({ userEmail, title, message, status }, userId);
        (0, response_1.default)(res, true, http_status_codes_1.StatusCodes.CREATED, "Contact created successfully!", createdContact);
    }
    catch (error) {
        console.error(error);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Error creating contact",
            error: error.message,
        });
    }
};
exports.CreateContact = CreateContact;
const FindAllContacts = async (req, res) => {
    try {
        const allContacts = await contact_service_1.default.findAllContacts();
        (0, response_1.default)(res, true, http_status_codes_1.StatusCodes.OK, "All contacts retrieved successfully!", allContacts);
    }
    catch (error) {
        console.error(error);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Error retrieving contacts",
            error: error.message,
        });
    }
};
exports.FindAllContacts = FindAllContacts;
const EditContact = async (req, res) => {
    const contactId = req.params.contactId;
    const updatedDetails = req.body;
    try {
        const updatedContact = await contact_service_1.default.updateContact(contactId, updatedDetails);
        if (!updatedContact) {
            throw new NotFoundError_1.default("Contact not found!");
        }
        (0, response_1.default)(res, true, http_status_codes_1.StatusCodes.OK, "Contact updated successfully!", updatedContact);
    }
    catch (error) {
        console.error(error);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Error updating contact",
            error: error.message,
        });
    }
};
exports.EditContact = EditContact;
const DeleteContact = async (req, res) => {
    const contactId = req.params.contactId;
    try {
        const deletedContact = await contact_service_1.default.deleteContactById(contactId);
        if (!deletedContact) {
            throw new NotFoundError_1.default("Contact not found!");
        }
        (0, response_1.default)(res, true, http_status_codes_1.StatusCodes.OK, "Contact deleted successfully!", deletedContact);
    }
    catch (error) {
        console.error(error);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Error deleting contact",
            error: error.message,
        });
    }
};
exports.DeleteContact = DeleteContact;
