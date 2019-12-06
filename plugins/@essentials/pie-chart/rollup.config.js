import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import replace from 'rollup-plugin-replace'
import minify from 'rollup-plugin-babel-minify'

export default {
  input: 'src/index.js',
  output: {
    file: 'build/bundle.min.js',
    format: 'esm',
    name: 'bundle',
  },
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**',
    }),
    commonjs({
      include: 'node_modules/**',
      namedExports: {
        'node_modules/react/index.js': [
          'Children',
          'Component',
          'PropTypes',
          'PureComponent',
          'React',
          'createElement',
          'createRef',
          'isValidElement',
          'cloneElement',
          'Fragment',
        ],
        'node_modules/react-dom/index.js': [
          'render',
          'createElement',
          'findDOMNode',
          'createPortal',
        ],
      },
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    minify({
      comments: false,
    }),
  ],
}