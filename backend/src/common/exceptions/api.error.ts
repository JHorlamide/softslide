/*  Libraries*/
import httpStatus from "http-status";

export class APIError extends Error {
  statusCode: number;

  constructor(message: string, status: number) {
    super(message);

    this.statusCode = status;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ClientError extends APIError {
  constructor(message: string) {
    super(message, httpStatus.BAD_REQUEST);
  }
}

export class NotFoundError extends APIError {
  constructor(message: string) {
    super(message, httpStatus.NOT_FOUND);
  }
}

export class ServerError extends APIError {
  constructor(message: string) {
    super(message, httpStatus.INTERNAL_SERVER_ERROR);
  }
}
