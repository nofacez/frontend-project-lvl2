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
      if (hasChildren(item) && !_.isString(item)) {
        const { name, type, children } = item;
        const openingLine = `${space.repeat(depth)}${type} ${name}: ${start}`;
        const closingLine = `${space.repeat(depth + 2)}${end}`;
        return `${openingLine}${inner(children, depth + 4)}${closingLine}`;
      }
      const { name, type, value } = item;
      if (_.isObject(value)) {
        const openingLine = `${space.repeat(depth)}${type} ${name}: ${start}`;
        const closingLine = `${space.repeat(depth + 2)}${end}`;
        return `${openingLine}${getChildren(value, depth + 4)}${closingLine}`;
      }
      const line = `${space.repeat(depth)}${type} ${name}: ${value}`;
      return line;
    });
    const difference = `\n${result.join('\n')}\n`;
    return difference;
  };
  return `{${inner(dif, 2)}}`;
};

export default styleData;
