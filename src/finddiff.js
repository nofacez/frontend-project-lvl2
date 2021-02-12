/* eslint-disable consistent-return */
/* eslint-disable object-curly-newline */
/* eslint-disable array-callback-return */
/* eslint-disable no-else-return */
/* eslint-disable spaced-comment */
/* eslint-disable no-restricted-syntax */
/* eslint-disable import/extensions */
import _ from 'lodash';
import parsers from './parsers.js';
import formatData from '../formatters/index.js';

const genDiff = (filePath1, filePath2, formater = 'stylish') => {
  const file1 = parsers(filePath1);
  const file2 = parsers(filePath2);

  const iterate = (obj1, obj2) => {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    const allKeys = _.uniq(keys1.concat(keys2)).sort();
    const result = allKeys.flatMap((key) => {
      const value1 = obj1[key];
      const value2 = obj2[key];
      if (_.has(obj1, key) && _.has(obj2, key)) {
        if (_.isObject(value1) && _.isObject(value2)) {
          return { name: key, type: ' ', children: iterate(value1, value2), itemState: 'equal' };
        } else if (value1 === value2) {
          return { name: key, type: ' ', value: value1, itemState: 'equal' };
        } else {
          return [
            { name: key, type: '-', value: value1, itemState: 'from' },
            { name: key, type: '+', value: value2, itemState: 'to' },
          ];
        }
      } else if (!_.has(obj1, key)) {
        return {
          name: key, type: '+', value: value2, itemState: 'added',
        };
      } else if (!_.has(obj2, key)) {
        return {
          name: key, type: '-', value: value1, itemState: 'removed',
        };
      }
    });
    return result;
  };

  const data = formatData(iterate(file1, file2), formater);
  return data;
};

export default genDiff;
// genDiff('../__fixtures__/file1.json', '../__fixtures__/file2.json', 'json');
