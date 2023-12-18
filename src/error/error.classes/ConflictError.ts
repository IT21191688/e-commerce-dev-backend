import CustomAPIError from "./CustomAPIError";
import { StatusCodes } from "http-status-codes";

class ConflictError extends CustomAPIError {
  statusCode: StatusCodes;
  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.CONFLICT;
  }
}

export default ConflictError;
