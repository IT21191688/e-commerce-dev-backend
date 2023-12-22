import { Router } from "express";
import authMiddleware from "../auth/auth.middleware";

import {
  AddToCart,
  GetCartItemsByUserId,
  RemoveCartItem,
} from "./cart.controller";

import constants from "../constant";

const CartRouter = Router();

CartRouter.post(
  "/addCart",
  authMiddleware.authorize([
    constants.USER.ROLES.ADMIN,
    constants.USER.ROLES.USER,
  ]),
  AddToCart
);

CartRouter.get(
  "/getCartItemsUserId",
  authMiddleware.authorize([
    constants.USER.ROLES.ADMIN,
    constants.USER.ROLES.USER,
  ]),
  GetCartItemsByUserId
);

CartRouter.delete(
  "/removeCartItem/:cartItemId",
  authMiddleware.authorize([
    constants.USER.ROLES.ADMIN,
    constants.USER.ROLES.USER,
  ]),
  RemoveCartItem
);

export default CartRouter;
