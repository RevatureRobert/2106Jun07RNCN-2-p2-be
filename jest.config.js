const { defaults } = require('jest-config');
module.exports = {
  collectCoverageFrom: [
    './src/**/*'
    // "!**/node_modules/**",
  ],
  preset: 'jest-dynalite',
  roots: ['<rootDir>'],
  testMatch: [
    '**/__tests__/**/*.+(ts|tsx|js)',
    '**/?(*.)+(spec|test).+(ts|tsx|js)'
  ],
  collectCoverage: true,
  coverageDirectory: 'coverage'
};
