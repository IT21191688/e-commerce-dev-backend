import { Response, Request } from "express";

const CustomResponse = (
  res: Response,
  isSuccessful: boolean,
  statusCode: any,
  message: string,
  data: any
) => {
  let timeStamp: any = new Date().toISOString();
  return res
    .status(statusCode)
    .json({ isSuccessful, timeStamp, message, data });
};

export default CustomResponse;
