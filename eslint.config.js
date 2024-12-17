// @ts-check
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import stylisticTs from '@stylistic/eslint-plugin-ts';
import parserTs from '@typescript-eslint/parser';

export default tseslint.config({
    ignores: ['node_modules', '**/node_modules/**', '**/*.js', '**/*.d.ts'],
  }, {
    plugins: {
      '@stylistic/eslint-plugin-ts': stylisticTs
    },
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  eslintPluginPrettierRecommended, {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      ecmaVersion: 5,
      sourceType: 'module',
      parser: parserTs,
      parserOptions: {
        project: ['tsconfig.json', 'tsconfig.spec.json'],
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  }, {
    rules: {
      '@stylistic/eslint-plugin-ts/semi': ['error', 'always'],
      '@stylistic/eslint-plugin-ts/consistent-type-definitions': 'off',
      '@stylistic/eslint-plugin-ts/no-extraneous-class': 'off',
      '@stylistic/eslint-plugin-ts/quotes': ['error', 'single']
    },
  },
);