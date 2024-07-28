import packageJson from '../package.json' assert { type: 'json' };

import { babel } from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';

const extensions = ['.ts', '.tsx', '.js', '.jsx', '.es6', '.es', '.mjs'];
const banner = `/*!
* alpine-reactivity v${packageJson.version}
* By Juro Oravec
* Released under the MIT License.
*/\n`;

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/cdn.js',
        name: 'AlpineReactivity',
        format: 'umd',
        sourcemap: true,
        banner,
      },
      {
        file: 'dist/cdn.min.js',
        name: 'AlpineReactivity',
        format: 'umd',
        plugins: [
          terser({
            format: { comments: /^!/, ecma: 2015, semicolons: false },
          }),
        ],
        sourcemap: true,
        banner,
      },
    ],
    external: ['alpinejs'],
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
