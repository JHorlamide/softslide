import { Request, Response } from "express";

/* Application Modules */
import asyncHandler from "../../common/middleware/asynchandler.middleware";
import authService from "../service/auth.service";
import responseHandler from "../../common/response.handler";

class AuthController {
  public getAuthenticationUrl = asyncHandler(async (req: Request, res: Response) => {
    const authUrl = authService.getAuthUrl();
    responseHandler.successResponse("Authentication URL sent", authUrl, res);
  });

  public handleAuthenticationCallback = asyncHandler(async (req: Request, res: Response) => {
    const code = req.query.code;
    const clientRedirectURL = await authService.handleAuthenticationCallBack(code);
    responseHandler.redirectResponse(clientRedirectURL, res);
  });
}

export default new AuthController();