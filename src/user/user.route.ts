import { Router } from "express";
import authMiddleware from "../auth/auth.middleware";

import {
  RegisterUser,
  GetUserProfile,
  GetAllUsers,
  EditUserDetails,
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

UserRouter.get(
  "/getAllUser",
  authMiddleware.authorize([constants.USER.ROLES.ADMIN]),
  GetAllUsers
);

UserRouter.patch(
  "/updateUser/:userId",
  authMiddleware.authorize([
    constants.USER.ROLES.ADMIN,
    constants.USER.ROLES.USER,
  ]),
  EditUserDetails
);
export default UserRouter;
