/* Libraries */
import { Request, Response, NextFunction } from "express";

/* Application Module */
import responseHandler from "../response.handler";
import { APIError } from "../exceptions/api.error";
import { logger } from "../../config/logger";

export function errorHandler(error: APIError, req: Request, res: Response, next: NextFunction) {
  logger.info(error.stack);

  const defaultError = {
    message: error.message || "Server error. Please try again later",
    statusCode: error.statusCode || 500
  }

  const errorObject = Object.assign({}, defaultError, error);
  return responseHandler.errorResponse(errorObject.statusCode, errorObject, res);
}

export const routeNotFoundErrorHandler = (req: Request, res: Response, next: NextFunction) => {
  responseHandler.errorResponse(404, { message: "Route not found" }, res);
  return next();
}
