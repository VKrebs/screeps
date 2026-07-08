import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import config from './screeps.json' with { type: 'json' };

export default {
    input: 'src/main.ts',

    output: {
        file: config.output,
        format: 'cjs',
    },

    plugins: [
        commonjs(),
        typescript()
    ]
};