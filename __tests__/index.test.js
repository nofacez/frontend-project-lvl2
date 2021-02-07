/* eslint-disable no-undef */
import fs from 'fs';
import path from 'path';
import gendiff from '../src/finddiff';

const getFixturePath = (filename) => path.normalize(path.join(process.cwd(), '__fixtures__', filename));

test('gendiff json', () => {
  console.log(getFixturePath('file3.json'));
  const dif = gendiff(getFixturePath('file1.json'), getFixturePath('file2.json'));
  const result = fs.readFileSync(getFixturePath('result'), 'utf-8');
  expect(dif).toEqual(result);
});

test('gendiff yml', () => {
  const dif = gendiff(getFixturePath('file3.yml'), getFixturePath('file4.yml'));
  const result = fs.readFileSync(getFixturePath('result2'), 'utf-8');
  expect(dif).toEqual(result);
});

test('plain formater', () => {
  const dif = gendiff(getFixturePath('file3.json'), getFixturePath('file4.json'), 'plain');
  const result = fs.readFileSync(getFixturePath('result3'), 'utf-8');
  expect(dif).toEqual(result);
});

test('toJson', () => {
  const dif = gendiff(getFixturePath('file3.json'), getFixturePath('file4.json'), 'json');
  const result = fs.readFileSync(getFixturePath('result4'), 'utf-8');
  expect(dif).toEqual(result);
})