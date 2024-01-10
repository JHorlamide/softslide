import { Request, Response, NextFunction } from "express";
import responseHandler from "../response.handler";

export function reqBodyValidator(schema: any) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);

    if (error) {
      return responseHandler.badRequest(error.details[0].message, res);
    }

    next();
  }
}

export function reqParamValidator(schema: any) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.params);

    if (error) {
      return responseHandler.badRequest(error.details[0].message, res);
    }

    next();
  }
}
