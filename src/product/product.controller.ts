import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import userService from "../user/user.service";
import emailTemplates from "../util/email-templates/email.templates";

import Product from "./product.model";
import productService from "./product.service";
import CustomResponse from "../util/response";

import NotFoundError from "../error/error.classes/NotFoundError";
import constants from "../constant";
import { sendEmail } from "../util/emailServer";
import BadRequestError from "../error/error.classes/BadRequestError";
import ForbiddenError from "../error/error.classes/ForbiddenError";

const CreateProduct = async (req: Request, res: Response) => {
  const body = req.body;
  const auth = req.auth;

  let createdProduct: any = null;

  try {
    const user = await userService.findById(auth._id);
    if (!user) throw new NotFoundError("User not found!");

    const newProduct = new Product({
      productname: body.productname,
      description: body.description,
      productcategory: body.productcategory,
      productprice: body.productprice,
      productqty: body.productqty,
      productimage: body.productimage,
      productstatus: body.productstatus,
      addedBy: auth._id,
    });

    createdProduct = await productService.save(newProduct, null);

    CustomResponse(
      res,
      true,
      StatusCodes.CREATED,
      "Product created successfully!",
      createdProduct
    );
  } catch (error: any) {
    // Handle error, such as logging or sending an error response
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Error creating product",
      error: error.message,
    });
  }
};

export { CreateProduct };
