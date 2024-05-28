import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "i5uiky",
  e2e: {
    baseUrl: "http://localhost:3000",
    supportFile: "cypress/support/index.ts",
  },
});
