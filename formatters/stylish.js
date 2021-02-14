/* eslint-disable import/extensions */
import _ from 'lodash';
import getChildren from '../src/getChildren.js';

const hasChildren = (obj) => _.keys(obj).includes('children');

const space = ' ';
const start = '{';
const end = '}';

const styleData = (dif) => {
  const inner = (arr, depth = 0) => {
    const result = arr.flatMap((item) => {
      const openingLine = `${space.repeat(depth)}${item.type} ${item.name}: ${start}`;
      const closingLine = `${space.repeat(depth + 2)}${end}`;
      if (hasChildren(item) && !_.isString(item)) {
        return `${openingLine}${inner(item.children, depth + 4)}${closingLine}`;
      }
      // without children
      if (_.isObject(item.value)) {
        return `${openingLine}${getChildren(item.value, depth + 4)}${closingLine}`;
      }
      return `${space.repeat(depth)}${item.type} ${item.name}: ${item.value}`;
    });
    const difference = `\n${result.join('\n')}\n`;
    return difference;
  };
  return `{${inner(dif, 2)}}`;
};

export default styleData;
