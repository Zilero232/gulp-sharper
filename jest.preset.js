// eslint-disable-next-line @typescript-eslint/no-require-imports
const nxPreset = require("./node_modules/@nx/jest/preset").default;

module.exports = {
  ...nxPreset,
  preset: "ts-jest",
  testEnvironment: "node",
  testTimeout: 35000,
  maxWorkers: 1,
  resetMocks: true,
  coverageReporters: ["html"],
  moduleFileExtensions: ["ts", "js", "html"],
  testMatch: ["**/+(*.)+(spec|test).+(ts|js)?(x)"],
};
