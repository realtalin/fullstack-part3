import js from '@eslint/js'
import globals from 'globals'
import eslintConfigPrettier from 'eslint-config-prettier'

/** @type {import('eslint').Linter.Config[]} */
export default [
  js.configs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: {
        ...globals.node,
      },
      ecmaVersion: 'latest',
    },
  },
  {
    ignores: ['dist/**', 'node_modules/**'],
  },
  {
    rules: {
      eqeqeq: 'error',
      'no-console': 'off',
    },
  },
  eslintConfigPrettier,
]
