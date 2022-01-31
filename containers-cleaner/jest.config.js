module.exports = {
  clearMocks: true,
  moduleFileExtensions: ["js", "ts"],
  testMatch: ["**/*.test.ts"],
  transform: {
    "^.+\\.[tj]s$": "ts-jest",
  },
  verbose: true,
  globals: {
    "ts-jest": {
      "tsconfig": '<rootDir>/tsconfig.json'
    }
  }
}
