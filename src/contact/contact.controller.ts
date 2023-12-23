import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import contactService from "./contact.service";
import CustomResponse from "../util/response";
import userService from "../user/user.service";
import NotFoundError from "../error/error.classes/NotFoundError";

const CreateContact = async (req: Request, res: Response) => {
  const auth = req.auth;
  const { title, message, status } = req.body;

  const user = await userService.findById(auth._id);
  if (!user) throw new NotFoundError("User not found!");

  const userEmail = user.email;
  const userId = auth._id;

  //console.log(title + message + status);

  try {
    const createdContact = await contactService.saveContact(
      { userEmail, title, message, status },
      userId
    );

    CustomResponse(
      res,
      true,
      StatusCodes.CREATED,
      "Contact created successfully!",
      createdContact
    );
  } catch (error: any) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Error creating contact",
      error: error.message,
    });
  }
};

const FindAllContacts = async (req: Request, res: Response) => {
  try {
    const allContacts = await contactService.findAllContacts();

    CustomResponse(
      res,
      true,
      StatusCodes.OK,
      "All contacts retrieved successfully!",
      allContacts
    );
  } catch (error: any) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Error retrieving contacts",
      error: error.message,
    });
  }
};

// Other contact controller functions as needed
// You can add/update/delete functions here using contactService methods

export {
  CreateContact,
  FindAllContacts /* Add other contact functions here */,
};
