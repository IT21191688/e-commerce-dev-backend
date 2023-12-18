import CustomAPIError from "./CustomAPIError";
import { StatusCodes } from "http-status-codes";

class UnauthorizedError extends CustomAPIError {
  statusCode: StatusCodes;
  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

export default UnauthorizedError;
