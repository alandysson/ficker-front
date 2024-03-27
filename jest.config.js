const nextJest = require("next/jest");
const createJestConfig = nextJest({
  dir: "./",
});
const customJestConfig = {
  moduleDirectories: ["node_modules", "<rootDir>/"],
  testEnvironment: "jest-environment-jsdom",
  reporters: ["default", ["jest-junit", {outputDirectory: "reports", outputName: "jest-junit.xml"}]],
};
module.exports = createJestConfig(customJestConfig);