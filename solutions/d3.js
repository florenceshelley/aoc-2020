const parseFile = require('../parseFile');
const file = process.argv[2];

parseFile(file, data => {
  let treeCount = 0;
  let index = 0;
  for (let row of data) {
    if (index >= row.length) {
      index -= row.length;
    }
    if (row[index] === '#') {
      treeCount++;
    }
    index += 3;
  }

  console.log('The number of trees encountered is:', treeCount);
});
