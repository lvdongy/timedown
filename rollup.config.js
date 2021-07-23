import json from 'rollup-plugin-json'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import clear from 'rollup-plugin-clear'
import { terser } from 'rollup-plugin-terser'
// import { eslint } from 'rollup-plugin-eslint'

import { name, version, author } from './package.json'
const banner =
  `${'/*!\n' + ' * '}${name} v${version}\n` +
  ` * ${new Date().toDateString()}, ${author}\n` +
  ` * Released under the MIT License.\n` +
  ` */`;
const fileName = 'timedown';

export default {
    input: 'src/timedown.js',

    output: [
        {
            file: `dist/${fileName}.esm.js`,
            format: 'es',
            banner
        },
        {   
            file: `dist/${fileName}.umd.js`,
            format: 'umd',
            name: 'Timedown',
            banner,
        },
        {   
            file: `dist/${fileName}.min.js`,
            format: 'iife',
            name: 'Timedown',
            banner,
        },
    ],

    plugins: [
        json(),

        clear({
            targets: ['dist']
        }),

        resolve(),

        commonjs({
            include: 'node_modules/**'
        }),

        // eslint({
        //     throwOnError: true,
        //     throwOnWarning: true,
        //     include: ['src/**'],
        //     exclude: ['node_modules/**']
        // }),

        babel({
            exclude: 'node_modules/**' // 只编译我们的源代码
        }),

        terser()
    ]

};