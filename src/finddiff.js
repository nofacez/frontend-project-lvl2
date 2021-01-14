/* eslint-disable import/extensions */
import _ from 'lodash';
import parseFile from './parsers.js';

const gendiff = (filepath1, filepath2) => {
  const resultArray = [];

  const file1 = parseFile(filepath1);
  const file2 = parseFile(filepath2);

  const keys1 = Object.keys(file1);
  const keys2 = Object.keys(file2);
  const allKeys = _.uniq(keys1.concat(keys2)).sort();

  allKeys.forEach((key) => {
    if (_.has(file1, key) && _.has(file2, key)) {
      if (file1[key] === file2[key]) {
        resultArray.push([' ', key, file1[key]]);
      } else {
        resultArray.push(['-', key, file1[key]]);
        resultArray.push(['+', key, file2[key]]);
      }
    }
    if (_.has(file1, key) && !_.has(file2, key)) {
      resultArray.push(['-', key, file1[key]]);
    }
    if (!_.has(file1, key) && _.has(file2, key)) {
      resultArray.push(['+', key, file2[key]]);
    }
  });
  const fin = resultArray.map(([status, key, value]) => `  ${status} ${key}: ${value}`);

  return `{\n${fin.join('\n')}\n}`;
};

export default gendiff;
