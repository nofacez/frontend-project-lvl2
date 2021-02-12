/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
import _ from 'lodash';

const hasChildren = (obj) => _.keys(obj).includes('children');

const complexValue = '[complex value]';

const mapping = {
  removed: (path) => `Property '${path}' was removed`,
  added: (path, newValue) => {
    if (!_.isString(newValue) || newValue === complexValue) {
      return `Property '${path}' was added with value: ${newValue}`;
    }
    return `Property '${path}' was added with value: '${newValue}'`;
  },
  from: (path, oldValue, newValue) => {
    const readyOldValue = !_.isString(oldValue) || oldValue === complexValue ? `${oldValue}` : `'${oldValue}'`;
    const readyNewValue = !_.isString(newValue) || newValue === complexValue ? `${newValue}` : `'${newValue}'`;
    return `Property '${path}' was updated. From ${readyOldValue} to ${readyNewValue}`;
  },
};

const formatDataToPlain = (dif) => {
  const inner = (difference, initPath = '') => {
    const unfilteredResult = difference
      .flatMap((item) => {
        if (hasChildren(item)) {
          const { name, children, itemState } = item;
          const newPath = initPath.concat('.', name);
          return inner(children, newPath);
        }
        const { name, value, itemState } = item;
        const newPath = initPath.concat('.', name);
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
      });
    const fin = result;
    return fin
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
  };
  const data = inner(dif);
  return `${data.join('\n')}`;
};

export default formatDataToPlain;
