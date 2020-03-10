const { getOptions } = require('loader-utils');
const { createHash } = require('crypto');
const path = require('path');
const fs = require('fs');

function hash(msg) {
  return createHash('md5').update(msg).digest('hex');
}

function writeFileSyncRecursive(filename, content) {
  const folders = filename.split(path.sep).slice(0, -1)

  if (folders.length) {
    // create folder path if it doesn't exist
    folders.reduce((last, folder) => {
      const folderPath = last ? last + path.sep + folder : folder
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath)
      }
      return folderPath
    })
  }
  fs.writeFileSync(filename, JSON.stringify(content))
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

  writeFileSyncRecursive(errorFilePath, error);

  return source;
}
