import _ from 'lodash';

export default (obj, depth) => {
  const space = ' ';
  const start = '{';
  const end = '}';
  const type = ' ';
  const inner = (objInner, depthInner) => {
    const entries = _.toPairs(objInner);
    const result = entries.map(([key, value]) => {
      if (_.isObject(value)) {
        const openingLine = `${space.repeat(depthInner)}${type} ${key}: ${start}`;
        const closingLine = `${space.repeat(depthInner + 2)}${end}`;
        return `${openingLine}${inner(value, depthInner + 4)}${closingLine}`;
      }
      const line = `${space.repeat(depthInner)}${type} ${key}: ${value}`;
      return line;
    });
    return `\n${result.join('\n')}\n`;
  };
  return inner(obj, depth);
};
