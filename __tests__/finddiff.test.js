/* eslint-disable no-undef */
import fs from 'fs';
import path from 'path';
import gendiff from '../src/finddiff';

const getFixturePath = (filename, format = '') => path.normalize(path.join('__fixtures__', format, filename));

test('gendiff json', () => {
  const dif = gendiff(getFixturePath('file1.json', 'json'), getFixturePath('file2.json', 'json'));
  const result = fs.readFileSync(getFixturePath('result', 'json'), 'utf-8');
  expect(dif).toEqual(result);
});

test('gendiff yml', () => {
  const dif = gendiff(getFixturePath('file1.yml', 'yml'), getFixturePath('file2.yml', 'yml'));
  const result = fs.readFileSync(getFixturePath('result', 'yml'), 'utf-8');
  expect(dif).toEqual(result);
});
