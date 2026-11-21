module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  verbose: true,
  roots: ["<rootDir>/"],
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
};
