module.exports = {
  extends: [
    'airbnb',
    'airbnb-typescript',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/@typescript-eslint',
    'prettier/react',
    'plugin:import/typescript',
  ],
  // even if already in ignore file, this is required to avoid warning in VSCode on these files
  ignorePatterns: ['jest.config.js', '.eslintrc.js', 'next.config.js'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'prettier', 'react-hooks'],
  root: true,
  rules: {
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/naming-convention': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-use-before-define': 0,
    'import/extensions': [
      2,
      {
        json: 'always',
        ts: 'never',
      },
    ],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: ['**/*.test.+(ts|tsx)', './src/testing/**'],
      },
    ],
    'import/order': [
      2,
      {
        alphabetize: {
          order: 'asc',
        },
        groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index']],
        'newlines-between': 'always',
        pathGroups: [
          {
            group: 'internal',
            pattern: '#*/**',
          },
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
      },
    ],
    'import/prefer-default-export': 0,
    'lines-between-class-members': [
      'error',
      'always',
      {
        exceptAfterSingleLine: true,
      },
    ],
    'max-classes-per-file': 0,
    'no-alert': 0,
    'no-console': [
      'error',
      {
        allow: ['warn', 'error'],
      },
    ],
    'no-nested-ternary': 0,
    'no-plusplus': 0,
    'no-underscore-dangle': 0,
    radix: ['error', 'as-needed'],
    'react-hooks/exhaustive-deps': 2,
    'react-hooks/rules-of-hooks': 2,
    'react/destructuring-assignment': 0,
    'react/jsx-props-no-spreading': 0,
    'react/prop-types': 0,
    'react/require-default-props': 0,
    'react/state-in-constructor': 0,
    'react/static-property-placement': 0,
    'react/require-default-props': [0, { ignoreFunctionalComponents: true }],
  },
}
