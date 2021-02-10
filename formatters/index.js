/* eslint-disable import/extensions */
import plainFormater from './plain.js';
import stylishFormater from './stylish.js';
import toJson from './toJson.js';

const formatersMap = {
  plain: plainFormater,
  stylish: stylishFormater,
  json: toJson,
};

export default (dif, formater) => formatersMap[formater](dif);
