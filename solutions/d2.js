const parseFile = require('../parseFile');
const file = process.argv[2];

const getCharCount = (password, char) => {
  const chars = password.split('').filter(curr => curr === char);
  return chars.length;
};

const getValidPasswords = arr => (
  arr.map(value => {
    // TODO: refactor this
    const [policy, password] = value.split(':');
    const MIN = policy.substr(0, policy.indexOf('-'));
    const MAX = policy.substr(policy.indexOf('-') + 1).split(' ')[0];
    const CHAR = policy.replace(/[^a-z]+/g, '');

    if (!password) return;
    const charCount = getCharCount(password, CHAR);
    return charCount >= MIN && charCount <= MAX;
  })
);

parseFile(file, data => {
  const rows = data.split('\n');
  const validPasswords = getValidPasswords(rows);
  const numValidPasswords = validPasswords.filter(isValid => isValid);
  console.log(numValidPasswords.length);
});

