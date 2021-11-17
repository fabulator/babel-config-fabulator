module.exports = {
    presets: [
        ['@babel/preset-react', { runtime: 'automatic' }],
        ['@babel/preset-typescript', { optimizeConstEnums: true }],
        [
            '@babel/preset-env',
            {
                bugfixes: true,
                modules: false,
                loose: true,
                useBuiltIns: 'usage',
                corejs: '3.19',
            },
        ],
    ],
    plugins: [
        '@babel/plugin-transform-runtime',
        '@babel/plugin-transform-react-constant-elements',
        '@babel/plugin-transform-react-display-name',
    ],
    env: {
        development: {
            plugins: [['react-refresh/babel', { skipEnvCheck: true }]],
        },
        production: {
            plugins: ['@babel/plugin-transform-react-inline-elements'],
        },
        test: {
            presets: [
                [
                    '@babel/preset-env',
                    {
                        modules: 'commonjs',
                        loose: true,
                        useBuiltIns: 'usage',
                        corejs: '3.19',
                    },
                ],
            ],
        },
    },
};
