const parseFile = require('../parseFile');
const file = process.argv[2];

const getTreeCountsProduct = arr => (
  arr.reduce((acc, curr) => acc *= curr, 1)
);

const getTreeCount = (slope, arr) => {
  const [right, down] = slope;
  let treeCount = 0;

  for (let i = 0; i < arr.length; i++) {
    const str = arr[i];

    for (let j = 0; j < str.length; j++) {
      if (j === right && str[j] === '#') {
        treeCount++;
      }
    }

    i+=down;
  }
  
  return treeCount;
};

parseFile(file, data => {
  const slopes = [[1,1], [3,1], [5,1], [7,1], [1,2]];
  const treeCountsPerSlope = [];
  
  slopes.map(slope => {
    const treeCount = getTreeCount(slope, data);
    treeCountsPerSlope.push(treeCount);
  });
  
  const treeCountsProduct = getTreeCountsProduct(treeCountsPerSlope);
  console.log('The product of all the tree counts per slope is:', treeCountsProduct);
});
