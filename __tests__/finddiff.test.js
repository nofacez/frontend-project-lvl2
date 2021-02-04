/* eslint-disable no-undef */
import fs from 'fs';
import path from 'path';
import gendiff from '../src/stylish';

const getFixturePath = (filename, format = '') => path.normalize(path.join(process.cwd(), '__fixtures__', format, filename));

test('gendiff json', () => {
  console.log(getFixturePath('file3.json', 'json'));
  const dif = gendiff(getFixturePath('file1.json', 'json'), getFixturePath('file2.json', 'json'));
  const result = fs.readFileSync(getFixturePath('result', 'json'), 'utf-8');
  expect(dif).toEqual(result);
});

test('gendiff yml', () => {
  const dif = gendiff(getFixturePath('file3.yml', 'yml'), getFixturePath('file4.yml', 'yml'));
  const result = fs.readFileSync(getFixturePath('result2', 'yml'), 'utf-8');
  expect(dif).toEqual(result);
});
