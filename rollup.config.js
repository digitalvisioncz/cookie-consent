import {babel} from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import {nodeResolve} from '@rollup/plugin-node-resolve';
import eslint from '@rollup/plugin-eslint';
import external from 'rollup-plugin-peer-deps-external';
import inject from '@rollup/plugin-inject';
import svgr from '@svgr/rollup';
import image from '@rollup/plugin-image';
import typescript from '@rollup/plugin-typescript';
import pkg from './package.json';

const plugins =  [
    postcss({
        config: {
            path: './postcss.config.js',
        },
    }),
    nodeResolve({
        extensions: [
            '.jsx',
            '.js',
            '.json',
            '.css',
        ],
    }),
    eslint({
        exclude: [
            '**/*.css',
            '**/*.svg',
            '**/*.png',
        ],
    }),
    external({
        includeDependencies: true,
    }),
    commonjs(),
    babel({
        babelHelpers: 'bundled',
        exclude: 'node_modules/**',
    }),
    inject({
        modules: {
            React: 'react',
        },
    }),
    image({
        exclude: ['**/*.svg'],
    }),
    svgr(),
    typescript(),
];

export default {
    input: ['src/index.ts', 'src/cookieContext/index.ts', 'src/useCookieConsent/index.ts'],
    output: [
        {
            dir: 'dist',
            format: 'cjs',
            exports: 'named',
        }, {
            dir: 'dist',
            format: 'es',
            exports: 'named',
        },
    ],
    external: [
        'react',
        'react-dom',
        'prop-types',
    ],
    plugins,
    preserveModules: true,
};
