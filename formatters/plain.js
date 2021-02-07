/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
import _ from 'lodash';

const hasChildren = (obj) => _.keys(obj).includes('children');

const replacer = '[complex value]';
const complexValue = replacer.substring(0, replacer.length);
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
  const result = [];
  const inner = (difference, path = '') => {
    _.forEach(difference, (item) => {
      let newPath = path;
      if (hasChildren(item) && !_.isString(item)) {
        const { name, children, itemState } = item;
        newPath = path.concat('.', name);
        if (itemState === 'removedFull' || itemState === 'addedFull' || itemState === 'updated') {
          result.push({ path: newPath, state: itemState, value: complexValue });
        } else {
          result.push({ path: newPath, state: itemState, value: complexValue });
          inner(children, newPath);
        }
      } else {
        const [type, name, value, itemState] = item;
        newPath = path.concat('.', name);
        result.push({ path: newPath, state: itemState, value });
      }
    });
    const res = result
      .filter((item) => item.state !== undefined)
      .map((item) => {
        const formattedPath = item.path.slice(1);
        if (item.state === 'updated') {
          const newValue = _.findLast(result, { path: item.path });
          if (item === newValue) return false;
          return {
            path: formattedPath, state: item.state, from: item.value, to: newValue.value,
          };
        }
        return { path: formattedPath, state: item.state, value: item.value };
      })
      .filter((item) => item !== undefined);
    const fin = [];
    res.forEach((item) => {
      switch (item.state) {
        case 'removed':
          fin.push(wasRemoved(item.path));
          break;
        case 'added':
          fin.push(wasAdded(item.path, item.value));
          break;
        case 'updated':
          fin.push(wasUpdated(item.path, item.from, item.to));
          break;
        case 'addedFull':
          fin.push(wasAdded(item.path, item.value));
          break;
        case 'removedFull':
          fin.push(wasRemoved(item.path));
          break;
        default:
          break;
      }
    });
    return `${fin.join('\n')}`;
  };
  return inner(dif);
};

// console.log(formatDataToPlain('../src/file3.json', '../src/file4.json'));
export default formatDataToPlain;
