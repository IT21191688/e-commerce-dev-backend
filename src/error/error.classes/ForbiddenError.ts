import CustomAPIError from "./CustomAPIError";
import { StatusCodes } from "http-status-codes";

class ForbiddenError extends CustomAPIError {
  statusCode: StatusCodes;
  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.FORBIDDEN;
  }
}

export default ForbiddenError;
