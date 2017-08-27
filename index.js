/*!
 * ACTIVERULES-read-files | MIT (c) Brian Winkers
 * https://github.com/bwinkers/activerules-read-files
*/
'use strict';

const fs = require('graceful-fs');
const runParalell = require('activerules-run-parallel');
const stripBom = require('strip-bom');

module.exports = function readMultipleFiles(filePaths, options, cb) {
  if (cb === undefined) {
    cb = options;
    options = null;
  }

  if (typeof cb !== 'function') {
    throw new TypeError(
      String(cb) +
      ' is not a function. Last argument to read-multiple-files must be a callback function.'
    );
  }

  if (!Array.isArray(filePaths)) {
    throw new TypeError(
      String(filePaths) +
      ' is not an array. First Argument to read-multiple-files must be an array of file paths.'
    );
  }

  runParalell(filePaths.map(filePath => fs.readFile.bind(fs, filePath, options)), (err, result) => {
    if (err) {
      cb(err);
      return;
    }

    cb(null, stripBom(result));
  });
};
