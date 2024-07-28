import packageJson from '../package.json' assert { type: 'json' };

import { babel } from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';

const extensions = ['.ts', '.tsx', '.js', '.jsx', '.es6', '.es', '.mjs'];
const banner = `/*!
* alpine-composition v${packageJson.version}
* By Juro Oravec
* Released under the MIT License.
*/\n`;

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/cdn.js',
        name: 'AlpineComposition',
        format: 'umd',
        globals: {
          'alpine-reactivity': 'AlpineReactivity',
        },
        sourcemap: true,
        banner,
      },
      {
        file: 'dist/cdn.min.js',
        name: 'AlpineComposition',
        format: 'umd',
        globals: {
          'alpine-reactivity': 'AlpineReactivity',
        },
        plugins: [
          terser({
            format: { comments: /^!/, ecma: 2015, semicolons: false },
          }),
        ],
        sourcemap: true,
        banner,
      },
    ],
    external: ['alpinejs', 'alpine-reactivity'],
    plugins: [
      nodeResolve({ extensions }),
      typescript(),
      babel({
        extensions,
        babelHelpers: 'inline',
      }),
    ],
  },
];
