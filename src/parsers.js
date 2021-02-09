/* eslint-disable import/extensions */
import path from 'path';
import yaml from 'js-yaml';
import fs from 'fs';
import getPath from './getPath.js';

export default (fileName, dir = process.cwd()) => {
  if (path.extname(fileName).includes('yml') || path.extname(fileName).includes('yaml')) {
    return yaml.load(fs.readFileSync(getPath(dir, fileName), 'utf-8'));
  }
  console.log(getPath(dir, fileName));
  return JSON.parse(fs.readFileSync(getPath(dir, fileName), 'utf-8'));
};
