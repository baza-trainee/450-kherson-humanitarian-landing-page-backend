const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    main: './bin/www',
  },
  output: {
    path: path.join(__dirname, 'dev-dist'),
    publicPath: '/',
    filename: '[name].js',
    clean: true
  },
  mode: 'development',
  target: 'node',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  }
};