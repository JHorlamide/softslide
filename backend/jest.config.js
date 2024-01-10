/** @type {import('jest').Config} */
const config = {
  verbose: true,
  forceExit: true,
  preset: "ts-jest",
  testEnvironment: "node",
  detectOpenHandles: true,
  transformIgnorePatterns: ["<rootDir>/node_modules/"],
  setupFilesAfterEnv: ['./jest.setup.redis-mock.js'],
};

module.exports = config;
