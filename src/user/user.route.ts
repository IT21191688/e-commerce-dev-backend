import { Router } from "express";
import authMiddleware from "../auth/auth.middleware";

import { RegisterUser, GetUserProfile } from "./user.controller";
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

export default UserRouter;
