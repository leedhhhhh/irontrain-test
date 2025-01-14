import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    plugins: { prettier },
    rules: {
      'no-console': 'warn',
      semi: ['error', 'always'],
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
      'prettier/prettier': ['error', { printWidth: 120 }],
      'no-unused-vars': ['error', { varsIgnorePattern: '^_' }],
      'react-hooks/rules-of-hooks': 'error', // Hook 사용 규칙 강제
      'react-hooks/exhaustive-deps': 'warn' // 의존성 배열 확인
    }
  },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended
];
