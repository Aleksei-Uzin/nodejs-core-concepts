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

  // Look for test files in tests/ directories
  testMatch: ['**/tests/**/*.test.js'],

  // Run tests in Node.js environment
  testEnvironment: 'node',

  // Show test results in a readable format
  verbose: true,

  // Watch for changes in test files and source files
  watchPathIgnorePatterns: ['node_modules', 'coverage'],

  // Transform ESM syntax to CommonJS for Jest's runtime.
  transform: {
    '^.+\\.m?js$': [
      'babel-jest',
      {
        presets: [['@babel/preset-env', { targets: { node: 'current' } }]],
      },
    ],
  },
};

export default config;
