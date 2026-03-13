import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 30000,
  retries: 1,
  reporter: [
    ["list"],
    ["html", { outputFolder: "test-report", open: "never" }],
  ],
  use: {
    baseURL: "http://localhost:3000",
    screenshot: "only-on-failure",
    video: "off",
  },
  outputDir: "test-results",
});
