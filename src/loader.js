const { getOptions } = require('loader-utils');
const { createHash } = require('crypto');
const fs = require('fs');

function hash(msg) {
  return createHash('md5').update(msg).digest('hex');
}

function writeFile(path, data) {
  fs.writeFile(path, JSON.stringify(data), (err) => {
    if (err) throw err;
  });
}

function writeCode() {
  const error = {};

  return {
    error,
    genErrorCode: function (message) {
      if (message) {
        const code = hash(message).substr(0, 10);
        
        error[code] = JSON.stringify(message);

        return code;
      }
    }
  };
}




const { genErrorCode, error } = writeCode();

module.exports = function loader(source) {
  const options = getOptions(this);
  const errorFilePath = options.errorFilePath || 'errorCode.json';

  source = source.replace(/throw new ErrorCode\((.+)\)/g, function(str, match) {
    const code = genErrorCode(match)
    return `throw ({ name: 'ErrorCode', code: "${code}", message: ${match} })`;
  })

  writeFile(errorFilePath, error);

  return source;
}