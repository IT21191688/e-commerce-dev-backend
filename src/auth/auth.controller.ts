import { Request, Response } from "express";
import userService from "../user/user.service";
import authService from "./auth.service";
import authUtil from "./auth.util";
import { StatusCodes } from "http-status-codes";
import CustomResponse from "../util/response";
import NotFoundError from "../error/error.classes/NotFoundError";
import BadRequestError from "../error/error.classes/BadRequestError";
const UserLogin = async (req: Request, res: Response) => {
  const body: any = req.body;

  if (!body.email || !body.password) {
    throw new BadRequestError("Email and password are required");
  }

  const isAuthCheck: any = await authService.findById(body.email);

  if (!isAuthCheck) throw new NotFoundError("Invalid email!");

  //compare password
  const isPasswordMatch = await authUtil.comparePassword(
    body.password,
    isAuthCheck.password
  );

  if (!isPasswordMatch) throw new BadRequestError("Invalid password!");

  //get user
  const populateUser: any = await isAuthCheck.populate("user");

  const token = authUtil.signToken(populateUser.user);

  let user = {
    fullName: populateUser.user.fullName,
    email: populateUser.user.email,
    role: populateUser.user.role,
  };

  CustomResponse(res, true, StatusCodes.OK, "Log in successfully!", {
    token,
    user: user,
  });
};

export { UserLogin };
