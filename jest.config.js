module.exports = {
    preset: "jest-dynalite",
    roots: ["<rootDir>"],
    testMatch: [
      "**/__tests__/**/*.+(ts|tsx|js)",
      "**/?(*.)+(spec|test).+(ts|tsx|js)",
      "!**/__tests__/unit/handlers/**/*.+(ts|tsx|js)",
    ],
    collectCoverage: true,
    collectCoverageFrom: [
    './src/**/*.js',
    ],
    coverageDirectory: 'coverage',
}
