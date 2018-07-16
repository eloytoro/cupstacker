import babel from 'rollup-plugin-babel';

export default {
  input: './index.js',
  output: [
    {
      file: 'dist/incwrap.cjs.js',
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: 'dist/incwrap.es.js',
      format: 'es',
      sourcemap: true,
    },
  ],
  plugins: [
    babel({
      babelrc: false,
      presets: [['@babel/preset-env', { modules: false }]]
    })
  ]
}
