import { Request, Response, NextFunction } from "express";

type RequestHandler = (req: Request, res: Response, next: NextFunction) => void;

/**
 * Async handler to wrap the API routes handler, allowing for async error handling.
 * @param requestHandler Function to call for the API endpoint
 * @returns Promise with a catch statement
 */
const asyncHandler = (requestHandler: RequestHandler) => (req: Request, res: Response, next: NextFunction) => {
  return Promise.resolve(requestHandler(req, res, next)).catch(next);
}

export default asyncHandler;