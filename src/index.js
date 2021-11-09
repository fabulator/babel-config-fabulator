module.exports = {
    presets: [
        ['@babel/preset-react', { runtime: 'automatic' }],
        '@babel/preset-typescript',
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
        'babel-plugin-react-anonymous-display-name',
        '@babel/plugin-transform-runtime',
        '@babel/plugin-transform-react-constant-elements',
    ],
    env: {
        test: {
            presets: [
                [
                    '@babel/preset-env',
                    {
                        modules: 'commonjs',
                        loose: true,
                        useBuiltIns: 'usage',
                        corejs: 3,
                    },
                ],
            ],
            plugins: ['babel-plugin-transform-dynamic-import'],
        },
        production: {
            presets: [
                [
                    'minify',
                    {
                        evaluate: false,
                        simplify: false,
                        // removeUndefined: false,
                        // deadcode: false,
                        // booleans: false,
                        // builtIns: false,
                        // consecutiveAdds: false,
                        // flipComparisons: false,
                        // guards: false,
                        // infinity: false,
                        // mangle: false,
                        // memberExpressions: false,
                        // numericLiterals: false,
                        // propertyLiterals: false,
                        // regexpConstructors: false,
                        // replace: false,
                        // simplifyComparisons: false,
                        // typeConstructors: false,
                        // undefinedToVoid: false,
                        mergeVars: false,
                        // removeConsole: false,
                        // removeDebugger: false,
                    },
                ],
            ],
        },
    },
};
