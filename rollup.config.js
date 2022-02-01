import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import typescript from 'rollup-plugin-typescript';

const excludePath = 'node_modules/**';

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

export default {
  input: 'src/main.ts',
  output: {
    file: 'bundle.js',
    format: 'cjs',
  },
  plugins: [typescript()],
};

function buildJS(input, output, format) {
  const defaultOutputConfig = {
    format,
    exports: 'named',
    sourcemap: true,
  };

  const esOutputConfig = {
    ...defaultOutputConfig,
    dir: output,
  };
  const cjsOutputConfig = {
    ...defaultOutputConfig,
    file: output,
  };

  const config = {
    input,
    external: ['react'],
    output: [format === 'es' ? esOutputConfig : cjsOutputConfig],
    plugins: [
      peerDepsExternal(),
      commonjs(),
      resolve({
        preferBuiltins: false,
        extensions,
      }),
      babel({
        presets: ['@babel/env', '@babel/preset-typescript'],
        plugins: ['@babel/plugin-transform-runtime'],
        babelHelpers: 'runtime',
        exclude: excludePath,
        extensions,
      }),
    ],
    preserveModules: format === 'es',
  };

  return config;
}
