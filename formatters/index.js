/* eslint-disable import/extensions */
import plainFormater from './plain.js';
import stylishFormater from './stylish.js';

export default (dif, formatter) => {
  let data;
  switch (formatter) {
    case 'stylish':
      data = stylishFormater(dif);
      break;
    case 'plain':
      data = plainFormater(dif);
      break;
    default:
      break;
  }
  return data;
};