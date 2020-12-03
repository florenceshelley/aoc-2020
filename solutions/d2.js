const parseFile = require('../parseFile');
const file = process.argv[2];

const getCharCount = (password, char) => {
  const chars = password.split('').filter(curr => curr === char);
  return chars.length;
};

const getRowData = row => {
  const [policy, password] = row.split(':');
  const [num1, num2] = policy.split(' ')[0].split('-');
  const char = policy.split(' ')[1];
  return [num1, num2, char, password];
};

const getValidCharCountPasswords = arr => (
  arr.filter(row => {
    const [MIN, MAX, CHAR, password] = getRowData(row);

    if (!password) return;
    const charCount = getCharCount(password, CHAR);
    return charCount >= MIN && charCount <= MAX;
  })
);

const getValidIndexedPasswords = arr => (
  arr.filter(row => {
    const [INDEX_ONE, INDEX_TWO, CHAR, password] = getRowData(row);

    if (!password) return;
    return password.charAt(INDEX_ONE) === CHAR && password.charAt(INDEX_TWO) !== CHAR ||
      password.charAt(INDEX_ONE) !== CHAR && password.charAt(INDEX_TWO) === CHAR
  })
);

parseFile(file, data => {
  const numValidCharCountPasswords = getValidCharCountPasswords(data).length;
  console.log('The number of valid passwords within the min/max values is', numValidCharCountPasswords);

  const numValidIndexedPasswords = getValidIndexedPasswords(data).length;
  console.log('The number of valid passwords with the correct indexes is', numValidIndexedPasswords);
});

