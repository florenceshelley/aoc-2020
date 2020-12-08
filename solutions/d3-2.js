const parseFile = require('../parseFile');
const file = process.argv[2];

const getTreeCountsProduct = arr => (
  arr.reduce((acc, curr) => acc *= curr, 1)
);

const getTreeCount = (slope, arr) => {
  const [right, down] = slope;
  let treeCount = 0;
  let position = 0;

  for (let i = 0; i < arr.length; i+=down) {
    const str = arr[i];
    if (str[position] === '#') {
      treeCount++;
    }
    position += right;
    if (position >= str.length) {
      position = position % str.length;
    }
  }

  console.log('tree count:', treeCount);
  return treeCount;
};

parseFile(file, data => {
  // should be: 90, 278, 88, 98, 45
  const slopes = [[1,1], [3,1], [5,1], [7,1], [1,2]];
  const treeCountsPerSlope = [];
  
  slopes.map(slope => {
    const treeCount = getTreeCount(slope, data);
    treeCountsPerSlope.push(treeCount);
  });
  
  const treeCountsProduct = getTreeCountsProduct(treeCountsPerSlope);
  console.log('The product of all the tree counts per slope is:', treeCountsProduct);
});
