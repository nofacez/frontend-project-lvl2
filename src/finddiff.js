/* eslint-disable spaced-comment */
/* eslint-disable no-restricted-syntax */
/* eslint-disable import/extensions */
import _ from 'lodash';
import parsers from './parsers.js';
import formatData from '../formatters/index.js';

const genDiff = (filePath1, filePath2, formater = 'stylish') => {
  const file1 = parsers(filePath1);
  const file2 = parsers(filePath2);
  console.log(file1, file2);

  const iterate = (obj1, obj2, status = '') => {
    const result = [];
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    const allKeys = _.uniq(keys1.concat(keys2)).sort();
    allKeys.forEach((key) => {
      const value1 = obj1[key];
      const value2 = obj2[key];
      if (_.has(obj1, key) && _.has(obj2, key)) {
        if (_.isObject(value1) && _.isObject(value2)) {
          result.push({ name: key, type: ' ', children: iterate(value1, value2) });
        } else if (value1 === value2) {
          result.push([' ', key, value1]);
        } else {
          if (_.isObject(value1)) {
            result.push({
              name: key, type: '-', children: iterate(value1, {}, 'removed'), itemState: 'updated',
            });
          } else {
            result.push(['-', key, value1, 'updated']);
          }
          if (_.isObject(value2)) {
            result.push({
              name: key, type: '+', children: iterate(value2, {}, 'removed'), itemState: 'updated',
            });
          } else {
            result.push(['+', key, value2, 'updated']);
          }
        }
      //not in the first but in the second
      } else if (!_.has(obj1, key)) {
        const state = status === 'removed' ? ' ' : '+';
        if (_.isObject(value2) && !_.isString(value2)) {
          result.push({
            name: key, type: state, children: iterate(value2, {}, 'removed'), itemState: 'addedFull',
          });
        } else {
          result.push([state, key, value2, 'added']);
        }
        //not in the second but in the first
      } else if (!_.has(obj2, key)) {
        const state = status === 'removed' || status === 'updated' ? ' ' : '-';
        if (_.isObject(value1) && !_.isString(value1)) {
          result.push({
            name: key, type: state, children: iterate(value1, {}, 'removed'), itemState: 'removedFull',
          });
        } else {
          result.push([state, key, value1, 'removed']);
        }
      }
    });
    return result;
  };
  // return iterate(file1, file2);
  const data = formatData(iterate(file1, file2), formater);
  console.log(data);
  return data;
};

export default genDiff;
