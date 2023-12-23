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

const OrderRouter = Router();

OrderRouter.post(
  "/createOrder",
  authMiddleware.authorize([
    constants.USER.ROLES.ADMIN,
    constants.USER.ROLES.USER,
  ]),
  CreateOrder
);

OrderRouter.get(
  "/getAllOrders",
  authMiddleware.authorize([
    constants.USER.ROLES.ADMIN,
    constants.USER.ROLES.USER,
  ]),
  FindAllOrders
);

OrderRouter.post(
  "/updateOrder/:orderId",
  authMiddleware.authorize([constants.USER.ROLES.ADMIN]),
  EditOrderDetails
);

OrderRouter.get(
  "/getOneOrder/:orderId",
  authMiddleware.authorize([
    constants.USER.ROLES.ADMIN,
    constants.USER.ROLES.USER,
  ]),
  FindOneOrderById
);

OrderRouter.get(
  "/getOrdersUser",
  authMiddleware.authorize([
    constants.USER.ROLES.ADMIN,
    constants.USER.ROLES.USER,
  ]),
  FindAllOrdersByUserId
);

OrderRouter.delete(
  "/deleteOrder/:orderId",
  authMiddleware.authorize([constants.USER.ROLES.ADMIN]),
  DeleteOrder
);

export default OrderRouter;
