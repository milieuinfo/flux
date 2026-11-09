// ESLint, zoals in de flux-starter-app: de aanbevolen regels voor JavaScript en TypeScript, in de browser; de scripts
// in resources/ draaien in Node.
import pluginJs from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
    {
        languageOptions: {
            globals: globals.browser,
        },
    },
    {
        files: ['resources/**/*.mjs'],
        languageOptions: {
            globals: globals.node,
        },
    },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
];
