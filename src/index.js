module.exports = {
    presets: [
        ['@babel/preset-react', { runtime: 'automatic' }],
        '@babel/preset-typescript',
        [
            '@babel/preset-env',
            {
                modules: false,
                loose: true,
                useBuiltIns: 'usage',
                corejs: 3,
            },
        ],
    ],
    plugins: [
        '@babel/plugin-transform-runtime',
        '@babel/plugin-proposal-object-rest-spread',
        ['@babel/plugin-proposal-class-properties', { loose: true }],
        'babel-plugin-transform-react-class-to-function',
        [
            '@babel/plugin-proposal-decorators',
            {
                decoratorsBeforeExport: true,
            },
        ],
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
        development: {
            plugins: ['react-hot-loader/babel', 'babel-plugin-typescript-to-proptypes', '@babel/plugin-syntax-dynamic-import'],
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
            plugins: ['@babel/plugin-syntax-dynamic-import'],
        },
    },
};
