/* Libraries */
import { Application } from "express";

/* Application Modules */
import config from "../config/app.config";
import authController from "./controller/auth.controller";
import { CommonRoutesConfig } from "../common/common.route.config";

const APP_PREFIX_PATH = config.prefix;

export class AuthRoute extends CommonRoutesConfig {
  constructor(app: Application) {
    super(app, "AuthRoute");
  }

  configureRoutes(): Application {
    /***
    * @route  GET: /api/auth/google
    * @desc   Send google authentication url to client
    * @access Public.
    * ***/
    this.app.get(`${APP_PREFIX_PATH}/auth/google`, authController.getAuthenticationUrl);

    /***
    * @route  GET: /api/callback
    * @desc   Handle the callback from the authentication flow
    * @access Public.
    * ***/
    this.app.get(`${APP_PREFIX_PATH}/auth/google/callback`, authController.handleAuthenticationCallback);

    return this.app;
  }
}