const fs = require('fs');

const SUM = 2020;
const getProduct = (num1, num2) => num1 * num2;
const getProductOfSummed = (arr, sum) => {
  for (let i = 0; i <= arr.length; i++) {
    for (let j = 1; j <= arr.length; j++) {
      const num1 = parseInt(arr[i]);
      const num2 = parseInt(arr[j]);
      if (num1 + num2 === sum) {
        console.log('The addends are:', num1, 'and', num2);
        return getProduct(num1, num2);
      }
    }
  }
};

fs.readFile('./01-input.txt', 'utf-8', (err, data) => {
  if (err) throw new Error(err);

  const numbers = data.split('\n');
  const product = getProductOfSummed(numbers, SUM);  
  console.log('The product is:', product);
});

