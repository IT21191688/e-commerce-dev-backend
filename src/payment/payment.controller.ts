import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Payment from "./payment.model";
import paymentService from "./payment.service";
import CustomResponse from "../util/response";
import userService from "../user/user.service";
import NotFoundError from "../error/error.classes/NotFoundError";
import ForbiddenError from "../error/error.classes/ForbiddenError";

const CreatePayment = async (req: Request, res: Response) => {
  const body = req.body;
  const auth: any = req.auth;

  const user = await userService.findById(auth._id);
  if (!user) {
    throw new NotFoundError("User not found!");
  }

  try {
    const createdPayment = await paymentService.createPayment(body);
    CustomResponse(
      res,
      true,
      StatusCodes.CREATED,
      "Payment created successfully!",
      createdPayment
    );
  } catch (error: any) {
    console.error(error);
    CustomResponse(
      res,
      false,
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Error creating payment",
      error.message
    );
  }
};

const RetrieveAllPayments = async (req: Request, res: Response) => {
  const auth: any = req.auth;

  const user = await userService.findById(auth._id);
  if (!user) {
    throw new NotFoundError("User not found!");
  }
  try {
    const allPayments = await paymentService.retrieveAllPayments();
    CustomResponse(
      res,
      true,
      StatusCodes.OK,
      "All payments retrieved successfully!",
      allPayments
    );
  } catch (error: any) {
    console.error(error);
    CustomResponse(
      res,
      false,
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Error retrieving payments",
      error.message
    );
  }
};

const RetrievePaymentDetailsUsingId = async (req: Request, res: Response) => {
  const paymentId = req.params.paymentId;
  const auth: any = req.auth;

  const user = await userService.findById(auth._id);
  if (!user) {
    throw new NotFoundError("User not found!");
  }

  try {
    const paymentDetails = await paymentService.retrievePaymentDetailsById(
      paymentId
    );
    CustomResponse(
      res,
      true,
      StatusCodes.OK,
      "Payment details retrieved successfully!",
      paymentDetails
    );
  } catch (error: any) {
    console.error(error);
    CustomResponse(
      res,
      false,
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Error retrieving payment details",
      error.message
    );
  }
};

const RetrieveAllUserPayments = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const auth: any = req.auth;

  const user = await userService.findById(auth._id);
  if (!user) {
    throw new NotFoundError("User not found!");
  }

  try {
    const userPayments = await paymentService.retrieveAllUserPayments(userId);
    CustomResponse(
      res,
      true,
      StatusCodes.OK,
      "User payments retrieved successfully!",
      userPayments
    );
  } catch (error: any) {
    console.error(error);
    CustomResponse(
      res,
      false,
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Error retrieving user payments",
      error.message
    );
  }
};

export {
  CreatePayment,
  RetrieveAllPayments,
  RetrievePaymentDetailsUsingId,
  RetrieveAllUserPayments,
};
