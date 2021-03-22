const parseFile = require('../parseFile');
const file = process.argv[2];

const getPassportFieldsSet = arr => {
  let passports = [];
  let passport = [];

  for (let row of arr) {
    if (row) {
      if (row.match(' ')) {
        const fields = row.split(' ');
        fields.map(field => passport.push(field));
      } else {
        passport.push(row);
      }
    } else {
      passports.push(passport);
      passport = [];
    }
  }

  return passports;
};

const toObject = arr => (
  arr.map(set => (
    set.reduce((acc, curr) => {
      const delimeter = curr.indexOf(':');
      const key = curr.substr(0, delimeter);
      const value = curr.substr(delimeter, curr.length);
      acc[key] = value;
      return acc;
    }, {})
  ))
);

parseFile(file, data => {
  console.log(data);
  const keys = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid', 'cid'];
  const passportFieldsSet = getPassportFieldsSet(data);
  const passports = toObject(passportFieldsSet);
  let validPssportCount = 0;

  console.log(passports);

  

  const allPassports = passportFieldsSet.map(passport => {
    let fields = [];
    passport.forEach(field => {
      const entries = field.split(' ');
      entries.forEach(entry => fields.push(entry));
    });
    const entries = fields.map(entry => entry.split(':'));
    // console.log('entries:', fields, entries);
    const obj = Object.fromEntries(entries);
    // console.log('obj:', obj);
    return obj;
  });

  // console.log('passports:', allPassports);
});

/**
 * Expected fields:
 * byr (Birth Year)
 * iyr (Issue Year)
 * eyr (Expiration Year)
 * hgt (Height)
 * hcl (Hair Color)
 * ecl (Eye Color)
 * pid (Passport ID)
 * cid (Country ID)
 * 
 * Passport data is validated by batch (input file)
 * Each passport is represented as a sequence of key:value pairs
 * Passports are separated by blank lines (check if regex space ('/s'))
 * 
 * Passports are valid if they contain all eight fields*
 * However, if missing cid, then it is not a passport! It's a North Pole Credential
 * NPCs can be treated like valid passports
 * 
 * - Count the number of valid passports, with cid as optional
 * 
 * split(' ') => ['iyr:2022', 'pid:93390086']
 * map() => split(':') => [['iyr', '2022'], ['pid', '93390086']]
 * Object.fromEntries() => {iyr: '2022', pid: '93390086'}
 */
