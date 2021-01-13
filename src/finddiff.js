import _ from 'lodash';
import fs from 'fs';
import path from 'path';

const getPath = (dir, filename) => path.resolve(dir, filename);

const gendiff = (filepath1, filepath2) => {
  const resultArray = [];
  const dir = process.cwd();
  const file1 = JSON.parse(fs.readFileSync(getPath(dir, filepath1)));
  const file2 = JSON.parse(fs.readFileSync(getPath(dir, filepath2)));

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
