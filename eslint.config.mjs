import config from '@iobroker/eslint-config';

export default [
    ...config,
    {
        // Vis-Widget-JS und Tests nicht mit dem Adapter-Core-ESLint-Regelwerk prüfen
        ignores: [
            '.dev-server/',
            '.vscode/',
            '*.test.js',
            'test/**/*.js',
            'widgets/**',
            '*.config.mjs',
            'admin/words.js',
        ],
    },
    {
        rules: {
            'jsdoc/require-jsdoc': 'off',
        },
    },
];