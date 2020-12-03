const fs = require('fs');
const parseFile = (file, callback) => {
  if (!file) throw new Error('You must pass in a file to parse, i.e. `node executable.js file`');

  fs.readFile(file, 'utf-8', (err, data) => {
    if (err) throw new Error(err);
    const rows = data.split('\n');
    callback(rows);
  });
};

module.exports = parseFile;

