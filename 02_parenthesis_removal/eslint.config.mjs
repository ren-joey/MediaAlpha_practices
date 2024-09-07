// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    {
        rules: {
            semi: 'error',
            indent: ['error', 4],
            '@typescript-eslint/no-explicit-any': 'off'
        },
        ignores: ['**/jest.config.js']
    },
    eslint.configs.recommended,
    ...tseslint.configs.recommended
);