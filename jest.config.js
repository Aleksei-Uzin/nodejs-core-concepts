/**
 * @type {import('jest').Config}
 * @see https://jestjs.io/docs/configuration
 */
const config = {
  // Run all tests to completion, and then report all errors
  bail: false,

  // Automatically clear mock calls, instances, contexts and results before every test
  clearMocks: true,

  // Don't collect coverage (disabled for performance)
  collectCoverage: false,

  // Only look for test files in src/ directory
  testMatch: ['**/src/**/*.test.js'],

  // Run tests in Node.js environment
  testEnvironment: 'node',

  // Show test results in a readable format
  verbose: true,

  // Watch for changes in test files and source files
  watchPathIgnorePatterns: ['node_modules', 'coverage'],

  // Setup files after the test framework is installed
  setupFilesAfterEnv: [],

  // Transform JavaScript files with babel-jest
  transform: {
    '^.+\\.js$': 'babel-jest',
  },

  // Don't transform node_modules
  transformIgnorePatterns: ['node_modules/(?!(.*))'],
};

module.exports = config;
