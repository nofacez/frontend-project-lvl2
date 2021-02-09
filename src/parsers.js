/* eslint-disable import/extensions */
import path from 'path';
import yaml from 'js-yaml';
import fs from 'fs';
import getPath from './getPath.js';

export default (fileName) => {
  if (path.extname(fileName).includes('yml') || path.extname(fileName).includes('yaml')) {
    return yaml.load(fs.readFileSync(getPath(fileName), 'utf-8'));
  }
  console.log(getPath(fileName));
  return JSON.parse(fs.readFileSync(getPath(fileName), 'utf-8'));
};
