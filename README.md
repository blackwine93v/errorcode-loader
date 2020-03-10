# Error Code generation for Webpack

### Install

`yarn add -D errorcode-loader`

### Usage

```javascript
function test() {
  throw new ErrorCode('Error message');
}
```

#### webpack.config.js

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          'babel-loader',
          {
            loader: 'errorcode-loader,
            options: {
              errorFilePath: 'ErrorCode.json'
            }
          }
        ]
      }
    ]
  }
};
```

ErrorCode.json will be:

`{"08e3733666":"\"'Error message'\""}`