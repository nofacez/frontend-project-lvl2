/* eslint-disable no-undef */
import fs from 'fs';
import path from 'path';
import gendiff from '../src/finddiff';

const getFixturePath = (filename, format = '') => path.normalize(path.join('__fixtures__', format, filename));

test('gendiff json', () => {
  const dif = gendiff(getFixturePath('file3.json', 'json'), getFixturePath('file4.json', 'json'));
  const result = fs.readFileSync(getFixturePath('result2', 'json'), 'utf-8');
  expect(dif).toEqual(result);
});

test('gendiff yml', () => {
  const dif = gendiff(getFixturePath('file3.yml', 'yml'), getFixturePath('file4.yml', 'yml'));
  const result = fs.readFileSync(getFixturePath('result2', 'yml'), 'utf-8');
  expect(dif).toEqual(result);
});
