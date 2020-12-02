const fs = require('fs');
const parseFile = (file, callback) => {
  if (!file) throw new Error('You must pass in a file to parse, e.g. `node executable.js file`');

  fs.readFile(file, 'utf-8', (err, data) => {
    if (err) throw new Error(err);
    callback(data);
  });
};

module.exports = parseFile;

