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
import commonService from "../common/common.service";

const CreateProduct = async (req: Request, res: Response) => {
  const body = req.body;
  const auth = req.auth;
  let file: any = req.file;

  if (!file) {
    throw new BadRequestError("News image is required!");
  }
  console.log(body);

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
      productstatus: body.productstatus,
      addedBy: auth._id,
    });

    let uploadedObj: any = null;
    if (file) {
      uploadedObj = await commonService.uploadImageAndGetUri(
        file,
        constants.CLOUDINARY.FILE_NAME + "/product"
      );
    }

    if (uploadedObj != null) {
      newProduct.productimage = uploadedObj.uri.toString();
      // console.log(uploadedObj.uri.toString());
    }

    createdProduct = await productService.save(newProduct, null);

    CustomResponse(
      res,
      true,
      StatusCodes.CREATED,
      "Product created successfully!",
      createdProduct
    );
  } catch (error: any) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Error creating product",
      error: error.message,
    });
  }
};

const FindAllProducts = async (req: Request, res: Response) => {
  try {
    const allProducts = await productService.findAllProduct();

    CustomResponse(
      res,
      true,
      StatusCodes.OK,
      "All products retrieved successfully!",
      allProducts
    );
  } catch (error: any) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Error retrieving products",
      error: error.message,
    });
  }
};

const EditProductDetails = async (req: Request, res: Response) => {
  const auth: any = req.auth;
  const productId = req.params.productId; // Assuming the product ID is passed in the URL parameters

  try {
    const product = await productService.findById(productId);

    if (!product) {
      throw new NotFoundError("Product not found!");
    }

    if (
      !product.addedBy ||
      product.addedBy.toString() !== auth._id.toString()
    ) {
      throw new ForbiddenError("You are not authorized to edit this product!");
    }

    const updatedDetails = req.body;
    const updatedProduct = await productService.editProductDetails(
      productId,
      updatedDetails
    );

    CustomResponse(
      res,
      true,
      StatusCodes.OK,
      "Product updated successfully!",
      updatedProduct
    );
  } catch (error: any) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Error updating product",
      error: error.message,
    });
  }
};

const DeleteProduct = async (req: Request, res: Response) => {
  const auth: any = req.auth;
  const productId = req.params.productId;

  try {
    const product = await productService.findById(productId);

    if (!product) {
      throw new NotFoundError("Product not found!");
    }

    /*
    if (
      !product.addedBy ||
      product.addedBy.toString() !== auth._id.toString()
    ) {
      throw new ForbiddenError("You are not authorized to edit this product!");
    }

    */
    await productService.deleteProductById(productId);

    CustomResponse(
      res,
      true,
      StatusCodes.OK,
      "Product deleted successfully!",
      null
    );
  } catch (error: any) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Error deleting product",
      error: error.message,
    });
  }
};

const FindOneProductById = async (req: Request, res: Response) => {
  const auth: any = req.auth;
  const productId = req.params.productId;

  const user = await userService.findById(auth._id);
  if (!user) throw new NotFoundError("User not found!");

  try {
    const product = await productService.findById(productId);

    if (!product) {
      throw new NotFoundError("Product not found!");
    }

    CustomResponse(
      res,
      true,
      StatusCodes.OK,
      "Product retrieved successfully!",
      product
    );
  } catch (error: any) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Error retrieving product",
      error: error.message,
    });
  }
};

const ReduceProductQuantity = async (productId: any, quantityToReduce: any) => {
  try {
    const product = await Product.findById(productId);

    if (!product) {
      throw new NotFoundError(`Product not found for ID: ${productId}`);
    }

    const newProductQty = product.productqty - quantityToReduce;

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { productqty: newProductQty },
      { new: true }
    );

    //console.log(updatedProduct);

    return updatedProduct;
  } catch (error: any) {
    throw new Error(`Error while updating product quantity: ${error.message}`);
  }
};

export {
  CreateProduct,
  FindAllProducts,
  EditProductDetails,
  DeleteProduct,
  FindOneProductById,
  ReduceProductQuantity,
};
