import { posix as path } from 'path'
import { mkdirp } from 'mkdirp'
import { writeFile } from 'fs/promises'
import { fileURLToPath } from 'url'

import packageJson from '../package.json' assert { type: 'json' }

import alias from '@rollup/plugin-alias'
import sass from 'rollup-plugin-sass'
import { babel } from '@rollup/plugin-babel'
import { terser } from 'rollup-plugin-terser'
import { nodeResolve } from '@rollup/plugin-node-resolve'

import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'
import postcss from 'postcss'
import { simple as walk } from 'acorn-walk'

const extensions = ['.ts', '.tsx', '.js', '.jsx', '.es6', '.es', '.mjs']

const banner = `/*!
* Alpinui v${packageJson.version}
* Forged by John Leider and Juro Oravec
* Released under the MIT License.
*/\n`

function fixWindowsPath(path) {
  return path.replace(/^[^:]+:\\/, '\\').replaceAll('\\', '/')
}

// NOTE: Unlike Vuetify, directives not built for Alpinui - not applicable
export default [
  {
    input: 'src/entry-bundler.ts',
    output: [
      {
        file: 'dist/alpinui.esm.js',
        format: 'es',
        sourcemap: true,
        banner,
      },
      {
        file: 'dist/alpinui.js',
        name: 'Alpinui',
        format: 'umd',
        globals: {
          vue: 'Vue',
          'alpine-composition': 'AlpineComposition',
          'alpine-reactivity': 'AlpineReactivity',
        },
        sourcemap: true,
        banner,
      },
      {
        file: 'dist/alpinui.min.js',
        name: 'Alpinui',
        format: 'umd',
        globals: {
          vue: 'Vue',
          'alpine-composition': 'AlpineComposition',
          'alpine-reactivity': 'AlpineReactivity',
        },
        plugins: [terser({
          format: { comments: /^!/, ecma: 2015, semicolons: false },
        })],
        sourcemap: true,
        banner,
      },
    ],
    external: ['vue', 'alpine-composition', 'alpine-reactivity'],
    plugins: [
      nodeResolve({ extensions }),
      babel({
        extensions,
        babelHelpers: 'inline',
      }),
      sass({
        options: {
          charset: false,
        },
        output (styles, styleNodes) {
          // Complete CSS bundle
          mkdirp(fileURLToPath(new URL('../dist', import.meta.url))).then(() => {
            return Promise.all([
              postcss([autoprefixer]).process(styles, { from: 'src' }),
              postcss([autoprefixer, cssnano({
                preset: 'default',
                postcssZindex: false,
                reduceIdents: false,
              })]).process(styles, { from: 'src' }),
            ])
          }).then(result => {
            writeFile(fileURLToPath(new URL('../dist/alpinui.css', import.meta.url)), banner + result[0].css, 'utf8')
            writeFile(fileURLToPath(new URL('../dist/alpinui.min.css', import.meta.url)), banner + result[1].css, 'utf8')
          })

          // Individual CSS files
          for (const { id, content } of styleNodes) {
            const out = path.parse(fixWindowsPath(id).replace(
              fileURLToPath(new URL('../src', import.meta.url)),
              fileURLToPath(new URL('../lib', import.meta.url))
            ))
            mkdirp(out.dir).then(() => {
              writeFile(path.join(out.dir, out.name + '.css'), content, 'utf8')
            })
          }
        },
      }),
      alias({
        entries: [
          { find: /^@\/(.*)/, replacement: fileURLToPath(new URL('../src/$1', import.meta.url)) },
        ],
      }),
      {
        async buildEnd () {
          const components = Object.create(null)
          const directives = []
          const variables = []

          { // Components
            const { importedIds } = this.getModuleInfo(
              (await this.resolve('src/components/index.ts')).id
            )
            await Promise.all(importedIds.map(async id => {
              // Fix for Windows
              const importFrom = path.relative(fileURLToPath(new URL('../src', import.meta.url)), fixWindowsPath(id)).replace(/\.ts$/, '.mjs')

              if (await this.resolve(path.join(id, '../_variables.scss')) != null) {
                variables.push(id)
              }

              const { ast } = this.getModuleInfo(id)
              walk(ast, {
                ExportNamedDeclaration (node) {
                  node.specifiers.forEach(node => {
                    components[node.exported.name] = importFrom
                  })
                  node.declaration?.declarations.forEach(node => {
                    components[node.id.name] = importFrom
                  })
                },
              })
            }))
          }

          this.emitFile({
            type: 'asset',
            fileName: 'json/importMap.json',
            source: JSON.stringify({
              components: Object.fromEntries(Object.entries(components).map(entry => [entry[0], {
                from: entry[1],
                styles: [], // TODO
              }])),
              directives,
            }, null, 2),
          })

          this.emitFile({
            type: 'asset',
            fileName: '_component-variables.sass',
            source: variables.map(id => {
              return `@forward '` + path.join(
                '../lib',
                path.relative(fileURLToPath(new URL('../src', import.meta.url)), id),
                '../_variables.scss'
              ) + `'`
            }).sort().join('\n'),
          })
        },
      },
    ],
  },
];
