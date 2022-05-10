module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'google', 'prettier'],
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      parser: '@typescript-eslint/parser',
      settings: {
        react: {version: 'detect'},
        'import/resolver': {
          typescript: {},
        },
      },
      extends: [
        'plugin:jest-dom/recommended',
        'plugin:jsx-a11y/recommended',
        'plugin:testing-library/react',
      ],
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {'require-jsdoc': 0, 'react/react-in-jsx-scope': 0},
};
