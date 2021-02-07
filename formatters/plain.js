/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
import _ from 'lodash';

const hasChildren = (obj) => _.keys(obj).includes('children');

const complexValue = '[complex value]';

const wasRemoved = (path) => `Property '${path}' was removed`;

const wasUpdated = (path, oldValue, newValue) => {
  if (!_.isString(newValue) || newValue === complexValue) {
    return `Property '${path}' was updated. From ${oldValue} to ${newValue}`;
  }
  if (!_.isString(oldValue) || oldValue === complexValue) {
    return `Property '${path}' was updated. From ${oldValue} to '${newValue}'`;
  }
  return `Property '${path}' was updated. From '${oldValue}' to '${newValue}'`;
};

const wasAdded = (path, newValue) => {
  if (!_.isString(newValue) || newValue === complexValue) {
    return `Property '${path}' was added with value: ${newValue}`;
  }
  return `Property '${path}' was added with value: '${newValue}'`;
};

const formatDataToPlain = (dif) => {
  const unfilteredData = [];
  const inner = (difference, path = '') => {
    _.forEach(difference, (item) => {
      let newPath = path;
      if (hasChildren(item) && !_.isString(item)) {
        const { name, children, itemState } = item;
        newPath = path.concat('.', name);
        if (itemState === 'removedFull' || itemState === 'addedFull' || itemState === 'updated') {
          unfilteredData.push({ path: newPath, state: itemState, value: complexValue });
        } else {
          unfilteredData.push({ path: newPath, state: itemState, value: complexValue });
          inner(children, newPath);
        }
      } else {
        const [type, name, value, itemState] = item;
        newPath = path.concat('.', name);
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
            finalDifference.push(wasRemoved(item.path));
            break;
          case 'added':
          case 'addedFull':
            finalDifference.push(wasAdded(item.path, item.value));
            break;
          case 'updated':
            finalDifference.push(wasUpdated(item.path, item.from, item.to));
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
