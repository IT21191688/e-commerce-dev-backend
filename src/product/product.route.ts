import { Router } from "express";
import authMiddleware from "../auth/auth.middleware";

import { CreateProduct, FindAllProducts } from "./product.controller";
import constants from "../constant";

const ProductRouter = Router();

ProductRouter.post(
  "/createProduct",
  authMiddleware.authorize([constants.USER.ROLES.ADMIN]),
  CreateProduct
);

ProductRouter.get(
  "/getAllProduct",
  authMiddleware.authorize([constants.USER.ROLES.ADMIN]),
  FindAllProducts
);

/*
UserRouter.get(
  "/profile",
  authMiddleware.authorize([
    constants.USER.ROLES.ADMIN,
    constants.USER.ROLES.USER,
  ]),
  GetUserProfile
);


UserRouter.patch(
  "/updateUser",
  authMiddleware.authorize([
    constants.USER.ROLES.ADMIN,
    constants.USER.ROLES.USER,
  ]),
  EditUserDetails
);

*/
export default ProductRouter;
