import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/common.esm.js',
      format: 'esm',
      sourcemap: true,
    },
    {
      file: 'dist/common.cjs.js',
      format: 'cjs',
      sourcemap: true,
    },
  ],
  plugins: [
    typescript(),
    nodeResolve(),
    commonjs(),
    terser({ format: { comments: true } }),
  ],
};
