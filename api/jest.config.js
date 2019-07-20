module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'ts'],
  transform: {
    '^.+\\.(ts)$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      diagnostics: false,
    },
  },
  testMatch: ['**/*.test.+(ts|js)'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
}
