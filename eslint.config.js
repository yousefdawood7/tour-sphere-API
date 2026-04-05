import eslint from '@eslint/js';
import globals from 'globals';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';

const eslintConfig = defineConfig([
  eslint.configs.recommended,
  tseslint.configs.recommended,
  {
    files: ['**/*.ts'],
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: import.meta.dirname,
      },

      globals: {
        ...globals.node,
      },
    },

    plugins: {
      'simple-import-sort': simpleImportSort,
    },

    rules: {
      'simple-import-sort/imports': 'warn',
      'simple-import-sort/exports': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],
    },
  },
]);

export default eslintConfig;
