import eslint from '@eslint/js';
import importHelpers from 'eslint-plugin-import-helpers';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['eslint.config.mjs', 'prisma', 'dist'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  eslintPluginPrettierRecommended,
  { rules: { 'prettier/prettier': 'warn' } },
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      sourceType: 'commonjs',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    rules: {
      '@typescript-eslint/only-throw-error': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
    }
  },
  {
    plugins: { 'import-helpers': importHelpers },
    rules: {
      'import-helpers/order-imports': [
        'warn',
        {
          newlinesBetween: 'always',
          groups: [
            'module',
            ['parent', 'sibling', 'index'],
            '/@types/',
            '/configs/',
            '/shared/http/',
            '/http/',
            '/shared/application/',
            '/application/',
            '/shared/infrastructure/',
            '/infrastructure/',
            '/shared/domain/',
            '/domain/',
            '/shared/presentation/',
            '/presentation/',
          ],
          alphabetize: { order: 'asc', ignoreCase: true },
        },
      ],
    },
  }
);