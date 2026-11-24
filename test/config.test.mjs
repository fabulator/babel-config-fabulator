import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { test } from 'node:test';
import { transformAsync } from '@babel/core';

const require = createRequire(import.meta.url);
const configFile = require.resolve('../src/index.js');

const source = `
const enum Size { Small }
type Props = { items: string[] };
export const List = ({ items }: Props) => <ul>{items.values().map((item) => <li key={item}>{item}</li>).toArray()}</ul>;
export const size = Size.Small;
export class Store { #value = 1; get value() { return this.#value; } }
export function read(resource: Disposable) { using disposable = resource; return disposable; }
`;

const transform = (envName) =>
  transformAsync(source, {
    configFile,
    envName,
    filename: 'component.tsx',
    babelrc: false,
  });

const jsxOutput = {
  development: /react\/jsx-dev-runtime/,
  // not @babel/runtime/helpers/jsx (inline-elements), its elements are invalid in React 19
  production: /react\/jsx-runtime/,
  test: /react\/jsx-runtime/,
};

for (const [envName, jsx] of Object.entries(jsxOutput)) {
  test(`transforms TSX in ${envName}`, async () => {
    const { code } = await transform(envName);

    assert.doesNotMatch(code, /: Props/, 'types are stripped');
    assert.doesNotMatch(code, /enum/, 'const enums are inlined');
    assert.match(
      code,
      /core-js\/modules\/es\.iterator\.map/,
      'core-js polyfills are injected',
    );
    assert.match(
      code,
      /@babel\/runtime\/helpers/,
      'runtime helpers are imported',
    );
    assert.match(code, jsx, 'JSX is compiled for the environment');
  });
}

test('development enables react-refresh', async () => {
  const { code } = await transform('development');
  assert.match(code, /\$RefreshReg\$/);
});

test('test env outputs CommonJS', async () => {
  const { code } = await transform('test');
  assert.match(code, /require\(/);
  assert.doesNotMatch(code, /^import /m);
});
