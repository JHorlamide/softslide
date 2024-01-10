/* Libraries */
import express from "express";
import helmet from "helmet";
import cors, { CorsOptions } from "cors";

/* Application Modules */
import config from "./app.config";
import { requestLogger } from "./request.logger";
import { CommonRoutesConfig } from "../common/common.route.config";
import { errorHandler, routeNotFoundErrorHandler } from "../common/middleware/errorhandler.middleware";

/* Routes imports */
import { AuthRoute } from "../auth/route.config";
import { SlideManagerRoute } from "../slidemanager/route.config";

const app = express();
const routes: CommonRoutesConfig[] = [];

/**
 * Middleware that enables Cross-Origin Resource Sharing (CORS) for the server.
 * This allows the server to handle requests from different domains or origins.
 * */
const corsOptions: CorsOptions = {
  origin: config.allowedOrigin,
  credentials: true,
}

app.use(cors(corsOptions));

/**
 * Middleware that sets various HTTP headers for enhanced security.
 * This helps protect our application from well-known web vulnerabilities.
 * */
app.use(helmet());

/**
 * adds middleware to parse incoming JSON data in HTTP requests and limits
 * the size of the JSON payload to 5 megabytes to prevent server overload.
 * */
app.use(express.json({ limit: "5mb" }));

/***
 * Enable parsing of URL-encoded data with extended syntax, 
 * allowing rich objects and arrays to be encoded into the URL - encoded format
 * */
app.use(express.urlencoded({ extended: false }));

/* Log request details only on dev and prod */
if (config.node_env !== "test") {
  app.use(requestLogger);
}

/* routes definition */
routes.push(new SlideManagerRoute(app));
routes.push(new AuthRoute(app));

/* Global error handing middleware */
app.use(errorHandler);

/* Route not found error handler */
app.use(routeNotFoundErrorHandler);

export { app, routes };
