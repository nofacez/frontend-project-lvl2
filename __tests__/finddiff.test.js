/* eslint-disable no-undef */
import fs from 'fs';
import path from 'path';
import gendiff from '../src/finddiff';

const getFixturePath = (filename) => path.normalize(path.join(process.cwd(), '__fixtures__', filename));

test('gendiff deep stylish', () => {
  const dif = gendiff(getFixturePath('file1.json'), getFixturePath('file2.yml'));
  const result = fs.readFileSync(getFixturePath('stylishResult.txt'), 'utf-8');
  expect(dif).toEqual(result);
});

test('plain formater', () => {
  const dif = gendiff(getFixturePath('file1.json'), getFixturePath('file2.yml'), 'plain');
  const result = fs.readFileSync(getFixturePath('plainResult.txt'), 'utf-8');
  expect(dif).toEqual(result);
});

test('toJson', () => {
  const dif = gendiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'json');
  const result = fs.readFileSync(getFixturePath('result4.txt'), 'utf-8');
  expect(dif).toEqual(result);
});
