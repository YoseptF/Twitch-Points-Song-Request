const path = require('path');

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
    ]
  }
};