// keep in sync with the minimal core-js version in package.json
const polyfills = [
  'babel-plugin-polyfill-corejs3',
  { method: 'usage-global', version: '3.51' },
];

module.exports = {
  // Babel 8 removed preset-env "loose", these assumptions are its documented equivalent
  assumptions: {
    arrayLikeIsIterable: true,
    constantReexports: true,
    ignoreFunctionLength: true,
    ignoreToPrimitiveHint: true,
    mutableTemplateObject: true,
    noClassCalls: true,
    noDocumentAll: true,
    objectRestNoSymbols: true,
    privateFieldsAsProperties: true,
    pureGetters: true,
    setClassMethods: true,
    setComputedProperties: true,
    setPublicClassFields: true,
    setSpreadProperties: true,
    skipForOfIteratorClosing: true,
    superIsCallableConstructor: true,
  },
  presets: [
    ['@babel/preset-react', { runtime: 'automatic' }],
    [
      '@babel/preset-env',
      { modules: false, exclude: ['transform-typeof-symbol'] },
    ],
    // Babel 8 defaults onlyRemoveTypeImports to true, keep Babel 7 behaviour for projects without verbatimModuleSyntax
    [
      '@babel/preset-typescript',
      { optimizeConstEnums: true, onlyRemoveTypeImports: false },
    ],
  ],
  plugins: [
    // Babel 8 removed useBuiltIns/corejs from preset-env, polyfills are injected by babel-plugin-polyfill-corejs3
    polyfills,
    // polyfills are global (usage-global), so helpers must not come from @babel/runtime-corejs3 suggested by the polyfill plugin
    ['@babel/plugin-transform-runtime', { moduleName: '@babel/runtime' }],
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
          { modules: 'commonjs', exclude: ['transform-typeof-symbol'] },
        ],
      ],
    },
  },
};
