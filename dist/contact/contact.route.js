"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = __importDefault(require("../auth/auth.middleware"));
const contact_controller_1 = require("./contact.controller");
const constant_1 = __importDefault(require("../constant"));
const ContactRouter = (0, express_1.Router)();
ContactRouter.post("/createContact", auth_middleware_1.default.authorize([
    constant_1.default.USER.ROLES.ADMIN,
    constant_1.default.USER.ROLES.USER,
]), contact_controller_1.CreateContact);
ContactRouter.get("/getAllContacts", auth_middleware_1.default.authorize([constant_1.default.USER.ROLES.ADMIN]), contact_controller_1.FindAllContacts);
ContactRouter.post("/updateContact/:contactId", auth_middleware_1.default.authorize([constant_1.default.USER.ROLES.ADMIN]), contact_controller_1.EditContact);
ContactRouter.delete("/deleteContact/:contactId", auth_middleware_1.default.authorize([constant_1.default.USER.ROLES.ADMIN]), contact_controller_1.DeleteContact);
// Other contact routes can be added here using corresponding controller functions
exports.default = ContactRouter;
