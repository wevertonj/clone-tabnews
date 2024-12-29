// @ts-check
import eslint from '@eslint/js';
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
  ...tseslint.configs.recommendedTypeChecked, {
    rules: {
      '@stylistic/eslint-plugin-ts/semi': ['error', 'always'],
      '@stylistic/eslint-plugin-ts/consistent-type-definitions': 'off',
      '@stylistic/eslint-plugin-ts/no-extraneous-class': 'off',
      '@stylistic/eslint-plugin-ts/quotes': ['error', 'single']
    },
  },
);
