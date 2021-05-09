module.exports = {
    'roots': [
        '<rootDir>/src'
    ],
    'testMatch': [
        '**/__tests__/**/*.+(ts|tsx|js)',
        '**/?(*.)+(spec|test).+(ts|tsx|js)'
    ],
    'transform': {
        '^.+\\.(ts|tsx)$': 'ts-jest'
    },
    'testResultsProcessor': 'jest-teamcity-reporter',
    'reporter': [
        'default',
        'jest-github-actions-reporter'
    ],
    testLocationInResults: true
};