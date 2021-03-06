/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
import fs from 'fs';
import path from 'path';
import gendiff from '../src/finddiff';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
// const getFixturePath = (filename) => path.normalize(path.join(, '__fixtures__', filename));
const getFixturePath = (filename) => path.join(process.cwd(), '__fixtures__', filename);

test('gendiff deep stylish', () => {
  const dif = gendiff(getFixturePath('file1.json'), getFixturePath('file2.yml'));
  const result = fs.readFileSync(getFixturePath('result1'), 'utf-8');
  expect(dif).toEqual(result);
});

test('plain formater', () => {
  const dif = gendiff(getFixturePath('file1.json'), getFixturePath('file2.yml'), 'plain');
  const result = fs.readFileSync(getFixturePath('result2'), 'utf-8');
  expect(dif).toEqual(result);
});

test('toJson', () => {
  const dif = gendiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'json');
  console.log(dif);
  const result = fs.readFileSync(getFixturePath('result3'), 'utf-8');
  expect(dif).toEqual(result);
});
