/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
import _ from 'lodash';

const hasChildren = (obj) => _.keys(obj).includes('children');

const complexValue = '[complex value]';

const mapping = {
  removed: (path) => `Property '${path}' was removed`,
  removedFull: (path) => `Property '${path}' was removed`,
  added: (path, newValue) => {
    if (!_.isString(newValue) || newValue === complexValue) {
      return `Property '${path}' was added with value: ${newValue}`;
    }
    return `Property '${path}' was added with value: '${newValue}'`;
  },
  addedFull: (path, newValue) => {
    if (!_.isString(newValue) || newValue === complexValue) {
      return `Property '${path}' was added with value: ${newValue}`;
    }
    return `Property '${path}' was added with value: '${newValue}'`;
  },
  updated: (path, oldValue, newValue) => {
    const readyOldValue = !_.isString(oldValue) || oldValue === complexValue ? `${oldValue}` : `'${oldValue}'`;
    const readyNewValue = !_.isString(newValue) || newValue === complexValue ? `${newValue}` : `'${newValue}'`;
    return `Property '${path}' was updated. From ${readyOldValue} to ${readyNewValue}`;
  },
};

const formatDataToPlain = (dif) => {
  const unfilteredData = [];
  const inner = (difference, path = '') => {
    _.forEach(difference, (item) => {
      if (hasChildren(item) && !_.isString(item)) {
        const { name, children, itemState } = item;
        const newPath = path.concat('.', name);
        if (itemState === 'removedFull' || itemState === 'addedFull' || itemState === 'updated') {
          unfilteredData.push({ path: newPath, state: itemState, value: complexValue });
        } else {
          unfilteredData.push({ path: newPath, state: itemState, value: complexValue });
          inner(children, newPath);
        }
      } else {
        const [type, name, value, itemState] = item;
        const newPath = path.concat('.', name);
        unfilteredData.push({ path: newPath, state: itemState, value });
      }
    });
    const finalDifference = [];
    unfilteredData
      .map((item) => {
        const formattedPath = item.path.slice(1);
        if (item.state === 'updated') {
          const newValue = _.findLast(unfilteredData, { path: item.path });
          if (item === newValue) return false;
          return {
            path: formattedPath, state: item.state, from: item.value, to: newValue.value,
          };
        }
        return {
          path: formattedPath, state: item.state, value: item.value,
        };
      })
      .forEach((item) => {
        switch (item.state) {
          case 'removed':
          case 'removedFull':
            finalDifference.push(mapping[item.state](item.path));
            break;
          case 'added':
          case 'addedFull':
            finalDifference.push(mapping[item.state](item.path, item.value));
            break;
          case 'updated':
            finalDifference.push(mapping[item.state](item.path, item.from, item.to));
            break;
          default:
            break;
        }
      });
    return `${finalDifference.join('\n')}`;
  };
  return inner(dif);
};

// console.log(formatDataToPlain('../src/file3.json', '../src/file4.json'));
export default formatDataToPlain;
