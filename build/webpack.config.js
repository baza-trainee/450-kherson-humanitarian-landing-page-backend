const path = require('path');

module.exports = (env, argv) => {
  const isDevelopment = argv.mode === 'development';

  return {
    mode: isDevelopment ? 'development' : 'production',
    entry: {
      main: './bin/www',
    },
    output: {
      path: path.join(__dirname, isDevelopment ? 'dev-dist' : 'prod-dist'), // Change the output path based on environment
      publicPath: '/',
      filename: '[name].js',
      clean: true,
    },
    target: 'node',
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        },
      ],
    },
  };
};
