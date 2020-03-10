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
          {
            loader: 'errorcode-loader,
            options: {
              errorFilePath: 'ErrorCode.json'
            }
          }, // should be after babel-loader
          'babel-loader'
        ]
      }
    ]
  }
};
```

ErrorCode.json will be:

`{"62a04ccd53":"\"'Error message'\""}`