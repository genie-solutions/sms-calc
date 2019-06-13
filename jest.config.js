module.exports = {
    testMatch: [
      "<rootDir>/src/**/__tests__/**/*.(j|t)s?(x)",
      "<rootDir>/src/**/?(*.)(spec|test).(j|t)s?(x)"
    ],
    moduleNameMapper: {
      "^src/(.*)$": "<rootDir>/src/$1"
    },
    moduleFileExtensions: ["ts", "tsx", "js"],
    transform: {
      "^.+\\.(ts|tsx)?$": "ts-jest"
    },
    testEnvironment: "node"
  };
  