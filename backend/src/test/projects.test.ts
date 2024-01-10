/* Core */
import http from "http";

/* Libraries */
import mongoose from "mongoose";
import supertest, { SuperAgentTest } from "supertest";

/* Application Modules */
import createServer from "../server";

describe("protein project endpoint", function () {
  let server: Promise<http.Server>;
  let request: SuperAgentTest

  beforeAll(async function () {
    server = createServer();
    request = supertest.agent(await server);
  })

  afterAll(async function () {
    (await server).close(async function () {
      await mongoose.connection.db.collection("projects").drop();
      await mongoose.disconnect();
    });
  });
});
