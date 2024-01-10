import { Response } from "express";
import httpStatus from "http-status";

/**
 * A class for handling HTTP responses with generic data type T.
 * Provides methods for successful, failure, and error responses.
 */
class ResponseHandler<T> {
  public resourceCreated(message: string, data: T, res: Response): Response {
    return res
      .status(httpStatus.CREATED)
      .json({ status: "Success", message, data })
  }

  public successResponse(message: string, data: T | undefined, res: Response): Response {
    return res
      .status(httpStatus.OK)
      .json({ status: "Success", message, data })
  }

  public noContentResponse(res: Response) {
    return res
      .status(httpStatus.NO_CONTENT)
      .json({ status: "Success" })
  }

  public badRequest(message: string, res: Response, status?: number): Response {
    return res
      .status(status || httpStatus.BAD_REQUEST)
      .json({ status: "Failure", message })
  }

  public unAuthorizedResponse(message: string, res: Response): Response {
    return res
      .status(httpStatus.UNAUTHORIZED)
      .json({ status: "Failure", message })
  }

  public forbiddenResponse(message: string, res: Response): Response {
    return res
      .status(httpStatus.FORBIDDEN)
      .json({ status: "Failure", message })
  }

  public serverErrorResponse(message: string, res: Response): Response {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ status: httpStatus.INTERNAL_SERVER_ERROR, message })
  }

  public errorResponse(status: number, responsePayload: any, res: Response): Response {
    return res
      .status(status)
      .type("json")
      .send(JSON.stringify({ ...responsePayload, status: "Failure" }))
  }

  public redirectResponse(redirectURL: string, res: Response) {
    return res.redirect(redirectURL);
  }
}

export default new ResponseHandler();
