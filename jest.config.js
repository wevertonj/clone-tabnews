/** @type {import('jest').Config} */
const config = {
    setupFilesAfterEnv: ["reflect-metadata"],
    collectCoverageFrom: [
      '<rootDir>/src/modules/**/*.ts',
      '!<rootDir>/src/modules/**/presenter/**',
      '!<rootDir>/src/**/index.ts',
      '!<rootDir>/src/**/external/**',
      '!<rootDir>/src/**/enums/**',
    ],
    coverageDirectory: "coverage",
    coverageProvider: "babel",
    moduleNameMapper: {
      '@/test/(.+)': '<rootDir>/test/$1',
      '@/(.+)': '<rootDir>/src/$1'
    },
    testMatch: ['**/*.spec.ts'],
    roots: [
      '<rootDir>/src',
      '<rootDir>/test'
    ],
    transform: {
      '^.+\\.(t|j)s$': 'ts-jest',
    },
    clearMocks: true,
  };
  
  export default config;