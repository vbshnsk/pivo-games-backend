module.exports = {
  mutate: ['src/**/*.ts'],
  checkers: ['typescript'],
  tsconfigFile: 'tsconfig.json',
  testRunner: 'jest',
  coverageAnalysis: 'perTest',
  jest: {
    projectType: 'custom',
    configFile: 'jest.config.js',
    enableFindRelatedTests: false,
  },
  packageManager: 'npm',
};
