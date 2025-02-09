module.exports = {
  e2e: {
    retries: {
      runMode: 2,  // Retry the test 2 times in run mode
      openMode: 0, // No retries when running in open mode
    },
    baseUrl: "http://localhost:3000",
    setupNodeEvents() {
      // implement node event listeners here
    },
  },
};
