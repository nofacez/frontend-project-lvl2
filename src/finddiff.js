/* eslint-disable object-curly-newline */
/* eslint-disable import/extensions */
import _ from 'lodash';
import parsers from './parsers.js';
import formatData from '../formatters/index.js';

const genDiff = (filePath1, filePath2, formater = 'stylish') => {
  const file1 = parsers(filePath1);
  const file2 = parsers(filePath2);

  const iterate = (obj1, obj2) => {
    const keys = _.union(_.keys(obj1), _.keys(obj2));
    const allSortedKeys = _.sortBy(keys);
    const result = allSortedKeys.flatMap((key) => {
      const value1 = obj1[key];
      const value2 = obj2[key];
      if (_.has(obj1, key) && _.has(obj2, key)) {
        if (_.isObject(value1) && _.isObject(value2)) {
          return { name: key, type: ' ', children: iterate(value1, value2), itemState: 'equal' };
        } if (value1 === value2) {
          return { name: key, type: ' ', value: value1, itemState: 'equal' };
        }
        return [
          { name: key, type: '-', value: value1, itemState: 'from' },
          { name: key, type: '+', value: value2, itemState: 'to' },
        ];
      } if (!_.has(obj1, key)) {
        return { name: key, type: '+', value: value2, itemState: 'added' };
      }
      return { name: key, type: '-', value: value1, itemState: 'removed' };
    });
    return result;
  };

  const data = formatData(iterate(file1, file2), formater);
  return data;
  // console.log(data);
};

export default genDiff;
// genDiff('../__fixtures__/file1.json', '../__fixtures__/file2.json', 'plain');
