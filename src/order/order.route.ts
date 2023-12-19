import { Router } from "express";
import authMiddleware from "../auth/auth.middleware";

import {
  CreateOrder,
  FindAllOrders,
  EditOrderDetails,
  DeleteOrder,
  FindOneOrderById,
  FindAllOrdersByUserId,
} from "./order.controller";
import constants from "../constant";

const ProductRouter = Router();

ProductRouter.post(
  "/createOrder",
  authMiddleware.authorize([
    constants.USER.ROLES.ADMIN,
    constants.USER.ROLES.USER,
  ]),
  CreateOrder
);

ProductRouter.get(
  "/getAllOrders",
  authMiddleware.authorize([
    constants.USER.ROLES.ADMIN,
    constants.USER.ROLES.USER,
  ]),
  FindAllOrders
);

/*
ProductRouter.patch(
  "/updateProduct/:productId",
  authMiddleware.authorize([constants.USER.ROLES.ADMIN]),
  EditProductDetails
);

ProductRouter.get(
  "/getOneProduct/:productId",
  authMiddleware.authorize([
    constants.USER.ROLES.ADMIN,
    constants.USER.ROLES.USER,
  ]),
  FindOneProductById
);

ProductRouter.delete(
  "/deleteProduct/:productId",
  authMiddleware.authorize([constants.USER.ROLES.ADMIN]),
  DeleteProduct
);
*/

export default ProductRouter;
