import type {Config} from 'jest';

const config: Config = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  testRegex: '.*\\.test\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: './output/coverage/jest',
  testEnvironment: 'node',

  coverageReporters: [
    "text"
  ],
  reporters: [
    "default",
    "jest-junit"
  ],
};

export default config;
