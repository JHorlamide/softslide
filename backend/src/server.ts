/* Core */
import http from "http";

/* Application Modules */
import config from "./config/app.config";
import { app, routes } from "./config/app";
import { logger } from "./config/logger";
import { onError } from "./config/request.logger";
import { CommonRoutesConfig } from "./common/common.route.config";

function createServer(): http.Server {
  app.set("port", config.port);

  const server = http.createServer(app);
  server.listen(config.port);
  server.on("error", onError);
  server.on("listening", () => {
    const addr = server.address();
    const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr?.port}`;
    logger.info(`Server listening on ${bind}... 🚀`);

    routes.forEach((route: CommonRoutesConfig) => {
      logger.info(`Routes configured for -> ${route.getName()}`);
    });
  });

  return server;
}

export default async function main(): Promise<http.Server> {
  return createServer();
}

if (config.node_env !== "test") {
  main();
}
