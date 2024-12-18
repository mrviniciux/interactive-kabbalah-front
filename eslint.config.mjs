import { defineConfig } from 'eslint-define-config';

export default defineConfig({
  files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
  extends: [
    'next/core-web-vitals',
    'plugin:storybook/recommended',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['react'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    'no-unused-vars': ['warn', { args: 'none' }],
  },
  env: {
    browser: true,
    node: true,
    es2021: true,
    jest: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
});
