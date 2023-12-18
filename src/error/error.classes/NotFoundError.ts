import CustomAPIError from "./CustomAPIError";
import { StatusCodes } from "http-status-codes";

class NotFoundError extends CustomAPIError {
  statusCode: StatusCodes;
  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

export default NotFoundError;
