/* eslint-disable no-undef */
import fs from 'fs';
import gendiff from '../src/finddiff';

const getFixturePath = (filename) => `./__fixtures__/${filename}`;

test('gendiff', () => {
  const dif = gendiff(getFixturePath('file1.json'), getFixturePath('file2.json'));
  const result = fs.readFileSync(getFixturePath('result'), 'utf-8');
  expect(dif).toEqual(result);
});
