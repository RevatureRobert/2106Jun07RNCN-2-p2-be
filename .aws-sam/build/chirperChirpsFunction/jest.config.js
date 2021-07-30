module.exports = {
  preset: 'jest-dynalite',
  roots: ['<rootDir>'],
  testMatch: ['**/?(*.)+(spec|test).+(ts|tsx|js)'],
  collectCoverage: true,
  collectCoverageFrom: ['./src/**/*.js'],
  coverageDirectory: 'coverage'
};
