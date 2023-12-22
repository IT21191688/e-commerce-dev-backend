// Cart controller
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import cartService from "./cart.service";
import CustomResponse from "../util/response";
import NotFoundError from "../error/error.classes/NotFoundError";
import ForbiddenError from "../error/error.classes/ForbiddenError";
import userService from "../user/user.service";
import productService from "../product/product.service";

const AddToCart = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const auth: any = req.auth;

    const data = {
      userid: auth._id,
      productid: body.productid,
      quantity: body.quantity,
    };

    const user = await userService.findById(auth._id);
    if (!user) {
      throw new NotFoundError("User not found!");
    }

    const addedCartItem = await cartService.addToCart(data);

    CustomResponse(
      res,
      true,
      StatusCodes.CREATED,
      "Item added to cart successfully!",
      { cartItem: addedCartItem }
    );
  } catch (error: any) {
    console.error(error);
    CustomResponse(
      res,
      false,
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Error adding item to cart",
      { error: error.message }
    );
  }
};

const GetCartItemsByUserId = async (req: Request, res: Response) => {
  try {
    // const userId = req.params.userId;

    const auth: any = req.auth;

    const userId = auth._id;

    const user = await userService.findById(auth._id);
    if (!user) {
      throw new NotFoundError("User not found!");
    }
    const cartItems = await cartService.findCartItemsByUserId(userId);
    CustomResponse(
      res,
      true,
      StatusCodes.OK,
      "Cart items retrieved successfully!",
      { cartItems: cartItems }
    );
  } catch (error: any) {
    console.error(error);
    CustomResponse(
      res,
      false,
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Error retrieving cart items",
      { error: error.message }
    );
  }
};

const RemoveCartItem = async (req: Request, res: Response) => {
  try {
    const cartItemId = req.params.cartItemId;

    const auth: any = req.auth;

    const user = await userService.findById(auth._id);
    if (!user) {
      throw new NotFoundError("User not found!");
    }
    await cartService.removeCartItem(cartItemId);
    CustomResponse(
      res,
      true,
      StatusCodes.OK,
      "Cart item removed successfully!",
      null
    );
  } catch (error: any) {
    console.error(error);
    CustomResponse(
      res,
      false,
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Error removing cart item",
      { error: error.message }
    );
  }
};

export { AddToCart, GetCartItemsByUserId, RemoveCartItem };
