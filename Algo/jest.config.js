const baseDir = "<rootDir>";
const baseTestDir = "<rootDir>";

module.exports = {
  testEnvironment: "node",
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: [`${baseDir}/fizzBuzz.js`],
  testMatch: [`${baseTestDir}/test/fizzBuzz.test.js`],
};
