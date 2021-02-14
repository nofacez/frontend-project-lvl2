/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
import _ from 'lodash';

const hasChildren = (obj) => _.keys(obj).includes('children');
const complexValue = '[complex value]';
const getQuotes = (value) => (!_.isString(value) || value === complexValue ? `${value}` : `'${value}'`);

const mapping = {
  removed: (path) => `Property '${path}' was removed`,
  added: (path, newValue) => `Property '${path}' was added with value: ${getQuotes(newValue)}`,
  from: (path, oldValue, newValue) => `Property '${path}' was updated. From ${getQuotes(oldValue)} to ${getQuotes(newValue)}`,
};

const formatDataToPlain = (dif) => {
  const inner = (difference, initPath = '') => {
    const unfilteredResult = difference
      .flatMap((item) => {
        const newPath = initPath.concat('.', item.name);
        if (hasChildren(item)) {
          return inner(item.children, newPath);
        }
        const { value, itemState } = item;
        if (_.isObject(value)) {
          return { path: newPath.slice(1), state: itemState, value: complexValue };
        }
        return { path: newPath.slice(1), state: itemState, value };
      });
    const result = unfilteredResult
      .filter((item) => item.state !== 'equal')
      .map((item) => {
        if (item.state === 'from') {
          const updatedTo = _.find(unfilteredResult, { path: item.path, state: 'to' }).value;
          return { ...item, updatedTo };
        }
        return item;
      })
      .filter((item) => item.state !== 'to')
      .map((item) => {
        switch (item.state) {
          case 'removed':
            return mapping[item.state](item.path);
          case 'added':
            return mapping[item.state](item.path, item.value);
          case 'from':
            return mapping[item.state](item.path, item.value, item.updatedTo);
          default:
            return item;
        }
      });
    return result;
  };
  const data = inner(dif);
  return `${data.join('\n')}`;
};

export default formatDataToPlain;
