import config from '@iobroker/eslint-config';

export default [
    ...config,
    {
        // Vis-Widget-Quellen nicht mit Adapter-Core-ESLint prüfen
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
