// import fs from 'fs';
// import readPkgUp from 'read-pkg-up';

// import babel from '@rollup/plugin-babel';
// import commonjs from '@rollup/plugin-commonjs';
// import resolve from '@rollup/plugin-node-resolve';
// import peerDepsExternal from 'rollup-plugin-peer-deps-external';
// import typescript from 'rollup-plugin-typescript';

// const { packageJson: pkg } = readPkgUp.sync({
//   cwd: fs.realpathSync(process.cwd()),
// });

// const pkgDependencies = Object.keys(pkg.dependencies || {});
// const pkgPeerDependencies = Object.keys(pkg.peerDependencies || {});
// const pkgOptionalDependencies = Object.keys(pkg.optionalDependencies || {});

// const excludePath = 'node_modules/**';

// const extensions = ['.js', '.jsx', '.ts', '.tsx'];

// const input = process.env.INPUT_FILE;

// const config = {
//   input,
//   external: pkgDependencies
//     .concat(pkgPeerDependencies)
//     .concat(pkgOptionalDependencies),
//   plugins: [
//     peerDepsExternal(),
//     commonjs(),
//     resolve({
//       preferBuiltins: false,
//       extensions,
//     }),
//     babel({
//       presets: ['@babel/env', '@babel/preset-typescript'],
//       plugins: ['@babel/plugin-transform-runtime'],
//       babelHelpers: 'runtime',
//       exclude: excludePath,
//       extensions,
//     }),
//   ],
// };

// export default config;

// // export default {
// //   input: 'src/main.ts',
// //   output: {
// //     file: 'bundle.js',
// //     format: 'cjs',
// //   },
// //   plugins: [typescript()],
// // };

// function buildJS(input, output, format) {
//   const defaultOutputConfig = {
//     format,
//     exports: 'named',
//     sourcemap: true,
//   };

//   const esOutputConfig = {
//     ...defaultOutputConfig,
//     dir: output,
//   };
//   const cjsOutputConfig = {
//     ...defaultOutputConfig,
//     file: output,
//   };

//   const config = {
//     input,
//     external: ['react'],
//     output: [format === 'es' ? esOutputConfig : cjsOutputConfig],
//     plugins: [
//       peerDepsExternal(),
//       commonjs(),
//       resolve({
//         preferBuiltins: false,
//         extensions,
//       }),
//       babel({
//         presets: ['@babel/env', '@babel/preset-typescript'],
//         plugins: ['@babel/plugin-transform-runtime'],
//         babelHelpers: 'runtime',
//         exclude: excludePath,
//         extensions,
//       }),
//     ],
//     preserveModules: format === 'es',
//   };

//   return config;
// }

import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import fs from 'fs';
import readPkgUp from 'read-pkg-up';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

const excludePath = 'node_modules/**';

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

const { packageJson: pkg } = readPkgUp.sync({
  cwd: fs.realpathSync(process.cwd()),
});

const input = process.env.INPUT_FILE;

export default [
  buildJS(input, pkg.main, 'cjs'),
  buildJS(input, 'dist/esm', 'es'),
];

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
