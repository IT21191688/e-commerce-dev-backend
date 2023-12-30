import { Router } from "express";
import authMiddleware from "../auth/auth.middleware";

import {
  RegisterUser,
  GetUserProfile,
  GetAllUsers,
  EditUserDetails,
  EditUserDetailsUserId,
  SendVerificationCode,
  ResetPassword,
} from "./user.controller";
import constants from "../constant";

const UserRouter = Router();

UserRouter.post("/register", RegisterUser);

UserRouter.get(
  "/profile",
  authMiddleware.authorize([
    constants.USER.ROLES.ADMIN,
    constants.USER.ROLES.USER,
  ]),
  GetUserProfile
);

UserRouter.post("/sendVerificationCode", SendVerificationCode);

UserRouter.post("/resetPassword", ResetPassword);

UserRouter.get(
  "/getAllUser",
  authMiddleware.authorize([constants.USER.ROLES.ADMIN]),
  GetAllUsers
);

UserRouter.post(
  "/updateUser",
  authMiddleware.authorize([
    constants.USER.ROLES.ADMIN,
    constants.USER.ROLES.USER,
  ]),
  EditUserDetails
);

UserRouter.post(
  "/updateUser/:userId",
  authMiddleware.authorize([constants.USER.ROLES.ADMIN]),
  EditUserDetailsUserId
); //
export default UserRouter;
