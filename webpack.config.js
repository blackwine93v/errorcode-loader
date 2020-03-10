const path = require('path');

module.exports = {
  mode: 'development',
  entry: './app.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          'babel-loader',
          {
            loader: path.resolve('./index.js'),
            options: {
              errorFilePath: 'ErrorCode.json'
            }
          },
        ]
      }
    ]
  }
};