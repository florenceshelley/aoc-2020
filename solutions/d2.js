const parseFile = require('../parseFile');
const file = process.argv[2];

const getCharCount = (password, char) => {
  const chars = password.split('').filter(curr => curr === char);
  return chars.length;
};

const getPolicyConditions = policy => {
  const [num1, num2] = policy.split(' ')[0].split('-');
  const char = policy.split(' ')[1];
  return [num1, num2, char];
};

const getValidCharCountPasswords = arr => (
  arr.filter(value => {
    const [policy, password] = value.split(':');
    const [MIN, MAX, CHAR] = getPolicyConditions(policy);

    if (!password) return;
    const charCount = getCharCount(password, CHAR);
    return charCount >= MIN && charCount <= MAX;
  })
);

const getValidIndexedPasswords = arr => (
  arr.filter(value => {
    const [policy, password] = value.split(':');
    const [INDEX_ONE, INDEX_TWO, CHAR] = getPolicyConditions(policy);

    if (!password) return;
    return password.charAt(INDEX_ONE) === CHAR && password.charAt(INDEX_TWO) !== CHAR ||
      password.charAt(INDEX_ONE) !== CHAR && password.charAt(INDEX_TWO) === CHAR
  })
);

parseFile(file, data => {
  const rows = data.split('\n');
  const validCharCountPasswords = getValidCharCountPasswords(rows);
  const numValidCharCountPasswords = validCharCountPasswords.length;
  console.log('The number of valid passwords within the min/max values is', numValidCharCountPasswords);

  const validIndexedPasswords = getValidIndexedPasswords(rows);
  const numValidIndexedPasswords = validIndexedPasswords.length;
  console.log('The number of valid passwords with the correct indexes is', numValidIndexedPasswords);
});

