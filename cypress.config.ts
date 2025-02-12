import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",  // Your app's base URL
    retries: {
      runMode: 2,   // Retry tests up to 2 times when running in headless mode
      openMode: 0,  // No retries when running in open mode (interactive mode)
    },
    setupNodeEvents(on, config) {
      // Implement node event listeners here (if needed)
      return config;
    },
    specPattern: 'cypress/e2e/**/*.cy.ts',  // Adjust to your test file location if necessary
    supportFile: 'cypress/support/e2e.ts',  // Point to your support file
  },
});
