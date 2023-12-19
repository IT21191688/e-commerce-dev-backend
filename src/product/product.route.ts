import { Router } from "express";
import authMiddleware from "../auth/auth.middleware";

import {
  CreateProduct,
  FindAllProducts,
  EditProductDetails,
} from "./product.controller";
import constants from "../constant";

const ProductRouter = Router();

ProductRouter.post(
  "/createProduct",
  authMiddleware.authorize([constants.USER.ROLES.ADMIN]),
  CreateProduct
);

ProductRouter.get(
  "/getAllProduct",
  authMiddleware.authorize([
    constants.USER.ROLES.ADMIN,
    constants.USER.ROLES.USER,
  ]),
  FindAllProducts
);

ProductRouter.patch(
  "/updateProduct/:productId",
  authMiddleware.authorize([constants.USER.ROLES.ADMIN]),
  EditProductDetails
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



*/
export default ProductRouter;
