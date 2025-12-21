module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',

  parserOptions: {
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname,
  },
  plugins: ['@typescript-eslint', 'import'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/restrict-plus-operands',
    'plugin:import/recommended',
    'plugin:import/typescript',
  ],
  env: {
    node: true,
    browser: true,
  },
  rules: {
    // Disallow debugging statements
    'no-debugger': 'error',
    // Prefer proper logging; allow error/warn
    'no-console': ['warn', { allow: ['error', 'warn'] }],
    // Unused imports/variables are errors
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    // Enforce strict imports
    'import/no-unresolved': 'error',
    'import/no-duplicates': 'error',
    // Misc strictness
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/strict-boolean-expressions': 'error',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};
