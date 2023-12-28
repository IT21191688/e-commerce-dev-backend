import { Router } from "express";
import authMiddleware from "../auth/auth.middleware";
import {
  CreateContact,
  FindAllContacts,
  /* Import other contact controller functions here if needed */
} from "./contact.controller";
import constants from "../constant";

const ContactRouter = Router();

ContactRouter.post(
  "/createContact",
  authMiddleware.authorize([
    constants.USER.ROLES.ADMIN,
    constants.USER.ROLES.USER,
  ]),
  CreateContact
);

ContactRouter.get(
  "/getAllContacts",
  authMiddleware.authorize([constants.USER.ROLES.ADMIN]),
  FindAllContacts
);

ContactRouter.post(
  "/updateContact/:contactId",
  authMiddleware.authorize([constants.USER.ROLES.ADMIN]),
  FindAllContacts
);

ContactRouter.delete(
  "/deleteContact/:contactId",
  authMiddleware.authorize([constants.USER.ROLES.ADMIN]),
  FindAllContacts
);

// Other contact routes can be added here using corresponding controller functions

export default ContactRouter;
