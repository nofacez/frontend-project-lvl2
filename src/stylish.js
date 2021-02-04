/* eslint-disable import/extensions */
import _ from 'lodash';
import getDiff from './finddiff.js';

const hasChildren = (obj) => _.keys(obj).includes('children');

const styleData = (file1, file2) => {
  const dif = getDiff(file1, file2);
  const space = ' ';
  const result = [];
  const inner = (arr, depth = 0) => {
    const start = '{';
    const end = '}';
    arr.forEach((item) => {
      if (hasChildren(item) && !_.isString(item)) {
        const { name, type, children } = item;
        const openingLine = `${space.repeat(depth)}${type} ${name}: ${start}`;
        const closingLine = `${space.repeat(depth + 2)}${end}`;
        result.push(openingLine);
        inner(children, depth + 4);
        result.push(closingLine);
      } else {
        const [type, name, value] = item;
        const line = `${space.repeat((depth))}${type} ${name}: ${value}`;
        result.push(line);
      }
    });

    return `{\n${result.join('\n')}\n}`;
  };

  return inner(dif, 2);
};

export default styleData;
