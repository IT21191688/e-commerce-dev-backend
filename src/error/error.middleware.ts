import { StatusCodes } from "http-status-codes";
import InternalServerError from "./error.classes/InternalServerError";
import { NextFunction, Request, Response } from "express";
import CustomResponse from "../util/response";

const errorHandlerMiddleware = async (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let customError: any = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || "Something went wrong!",
    data: {},
  };

  if (
    err instanceof InternalServerError ||
    customError.statusCode === StatusCodes.INTERNAL_SERVER_ERROR
  ) {
    customError.message = "Something went wrong!";
  }

  if (err.name === "ValidationError") {
    let validatorKeyValuePairs: any = {};

    Object.values(err.errors).forEach((error: any) => {
      validatorKeyValuePairs[error.properties.path] = error.properties.message;
    });

    customError.statusCode = StatusCodes.BAD_REQUEST;
    customError.message = "Validation Error";
    customError.data = validatorKeyValuePairs;
  }

  if (err.code && err.code === 11000) {
    customError.message = `${Object.keys(
      err.keyValue
    )} already exists! Please choose another value.`;

    customError.statusCode = StatusCodes.CONFLICT;
  }

  // handle mongo db cast errors
  if (err.name === "CastError") {
    customError.message = `No item found with ID "${err.value}"!`;
    customError.statusCode = StatusCodes.NOT_FOUND;
  }

  return CustomResponse(
    res,
    false,
    customError.statusCode,
    customError.message,
    customError.data
  );
};

export default errorHandlerMiddleware;
