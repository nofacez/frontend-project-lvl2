/* eslint-disable spaced-comment */
/* eslint-disable no-restricted-syntax */
/* eslint-disable import/extensions */
import _ from 'lodash';
import parsers from './parsers.js';

const getFileData = (filePath1, filePath2) => {
  const file1 = parsers(filePath1);
  const file2 = parsers(filePath2);

  const iterate = (obj1, obj2, status = ' ') => {
    const result = [];
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    const allKeys = _.uniq(keys1.concat(keys2)).sort();
    allKeys.forEach((key) => {
      const value1 = obj1[key];
      const value2 = obj2[key];
      if (_.has(obj1, key) && _.has(obj2, key)) {
        if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
          result.push({ name: key, type: ' ', children: iterate(value1, value2) });
        } else if (value1 === value2) {
          result.push([' ', key, value1]);
        } else {
          if (_.isObject(value1)) {
            result.push({ name: key, type: '-', children: iterate(value1, {}, 'removed') });
          } else {
            result.push(['-', key, value1]);
          }
          if (_.isObject(value2)) {
            result.push({ name: key, type: '+', children: iterate(value1, {}) });
          } else {
            result.push(['+', key, value2]);
          }
        }
      //not in the first but in the second
      } else if (!_.has(obj1, key)) {
        const state = status === 'removed' ? ' ' : '+';
        if (_.isObject(value2) && !_.isString(value2)) {
          result.push({ name: key, type: state, children: iterate(value2, {}, 'removed') });
        } else {
          result.push([state, key, value2]);
        }
        //not in the second but in the first
      } else if (!_.has(obj2, key)) {
        const state = status === 'removed' ? ' ' : '-';
        if (_.isObject(value1) && !_.isString(value1)) {
          result.push({ name: key, type: state, children: iterate(value1, {}, 'removed') });
        } else {
          result.push([state, key, value1]);
        }
      }
    });
    return result;
  };
  return iterate(file1, file2);
};

// getFileData('file3.json', 'file4.json');
export default getFileData;
