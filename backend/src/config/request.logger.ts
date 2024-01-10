import { Request, Response, NextFunction } from "express";
import { logger } from "./logger"

/**
  Logs the incoming requests and outgoing responses of the application to the console.
  This middleware function should be mounted to the Express application using app.use()
  before any route handlers to ensure all requests and responses are logged.
  The logged information includes the request method, path, request body (if any), query parameters (if any),
  and the response status code.
*/
export function requestLogger(req: Request, res: Response, next: NextFunction) {
  res.once("finish", () => {
    const log = [req.method, req.path];

    if (req.body && Object.keys(req.body).length > 0) {
      log.push(JSON.stringify(req.body));
    }

    if (req.query && Object.keys(req.query).length > 0) {
      log.push(JSON.stringify(req.query));
    }

    log.push("->", String(res.statusCode));
    logger.info(log.join(" "))
  })

  next();
}

export function onError(error: any) {
  console.error(`Failed to start server:\n${error.stack}`);
  process.exit(1);
}