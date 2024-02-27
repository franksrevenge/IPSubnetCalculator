module.exports = {
  plugins: ['@typescript-eslint', 'import', 'prefer-arrow', 'prettier', 'simple-import-sort', 'unicorn', 'promise'],
  extends: [
    'eslint:recommended',
    'airbnb-base',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:prettier/recommended',
    'plugin:promise/recommended',
  ],
  parserOptions: {
    project: 'tsconfig.json',
    ecmaVersion: 2023,
    sourceType: 'module',
  },
  rules: {
    'import/extensions': 'off',
    'import/prefer-default-export': 'off',
    'prefer-destructuring': 'off',
    'no-return-await': 'off',
    'dot-notation': 'off',
    radix: 'off',

    camelcase: ['error', { properties: 'never', ignoreDestructuring: true }],
    'no-console': 'error',

    '@typescript-eslint/no-shadow': 'error',
    'no-shadow': 'off',

    '@typescript-eslint/no-unused-vars': ['error', { varsIgnorePattern: '^_', argsIgnorePattern: '^_' }],
    'no-unused-vars': 'off',
  },
};

