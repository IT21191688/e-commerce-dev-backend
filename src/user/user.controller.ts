import { Request, Response } from "express";
import userUtil from "./user.util";
import userService from "./user.service";
import User from "./user.model";
import Auth from "../auth/auth.model";
import { StatusCodes } from "http-status-codes";
import { startSession } from "mongoose";
import CustomResponse from "../util/response";

// Import custom errors
import NotFoundError from "../error/error.classes/NotFoundError";
import BadRequestError from "../error/error.classes/BadRequestError";
import constants from "../constant";

const RegisterUser = async (req: Request, res: Response) => {
  const body: any = req.body;
  const user: any = new User(body.user);

  console.log(user.email);

  //check if user already exists
  const existingUser = await userService.findByEmail(user.email);

  if (existingUser) {
    throw new BadRequestError("User already exists!");
  }

  let organization: any = null;
  if (body.user.role == constants.USER.ROLES.ADMIN) {
    user.organization = organization._id;
  }

  //construct auth object
  const auth = new Auth();
  auth._id = user.email;
  auth.password = await userUtil.hashPassword(body.user.password);
  auth.user = user._id;

  let createdUser = null;

  //start mongoose session
  const session = await startSession();

  try {
    //start transaction in session
    session.startTransaction();

    //save user
    createdUser = await userService.save(user, session);

    //save auth
    await userService.save(auth, session);

    //commit transaction
    await session.commitTransaction();
  } catch (e) {
    //abort transaction
    await session.abortTransaction();
    throw e;
  } finally {
    //end session
    session.endSession();
  }

  return CustomResponse(
    res,
    true,
    StatusCodes.CREATED,
    "User registered successfully!",
    createdUser
  );
};

const GetUserProfile = async (req: Request, res: Response) => {
  const auth: any = req.auth;

  const user = await userService.findById(auth._id);

  if (!user) {
    throw new NotFoundError("User not found!");
  }

  return CustomResponse(
    res,
    true,
    StatusCodes.OK,
    "Profile fetched successfully!",
    user
  );
};

export { RegisterUser, GetUserProfile };
