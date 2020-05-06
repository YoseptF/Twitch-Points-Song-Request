const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: [path.resolve('assets', 'js', 'main.js')],
  output: {
    path: path.resolve('assets', 'js'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ],
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
    ]
  },
  plugins: [
    new Dotenv({
      // systemvars: true,
    }),
  ]
};