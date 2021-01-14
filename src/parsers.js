import path from 'path';
import yaml from 'js-yaml';
import fs from 'fs';

const getPath = (dir, filename) => path.resolve(dir, filename);

export default (fileName, dir = process.cwd()) => {
  if (path.extname(fileName).includes('yml') || path.extname(fileName).includes('yaml')) {
    return yaml.load(fs.readFileSync(getPath(dir, fileName), 'utf-8'));
  }
  return JSON.parse(fs.readFileSync(getPath(dir, fileName), 'utf-8'));
};
