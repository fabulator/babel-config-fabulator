import fabulator from 'eslint-config-fabulator';

export default [
  { ignores: ['node_modules/', 'package-lock.json', 'CHANGELOG.md'] },
  ...fabulator,
  {
    files: ['**/*.js', '**/*.cjs'],
    languageOptions: { sourceType: 'commonjs' },
  },
];
