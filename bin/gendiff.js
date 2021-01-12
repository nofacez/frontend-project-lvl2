#!/usr/bin/env node
const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const { Command } = require('commander'); // (normal include)

const getPath = (dir, filename) => path.resolve(dir, filename);

const gendiff = () => {
  const program = new Command();
  program
    .version('0.0.1')
    .arguments('<filepath1>, <filepath2>')
    .description('Compares two configuration files and shows a difference.')
    .option('-f, --format [type]', 'output format')

    .action((f1, f2) => {
      const resultArray = [];
      const dir = process.cwd();
      const file1 = JSON.parse(fs.readFileSync(getPath(dir, f1)));
      const file2 = JSON.parse(fs.readFileSync(getPath(dir, f2)));

      const keys1 = Object.keys(file1);
      const keys2 = Object.keys(file2);
      const allKeys = _.uniq(keys1.concat(keys2)).sort();

      allKeys.forEach((key) => {
        if (_.has(file1, key) && _.has(file2, key)) {
          if (file1[key] === file2[key]) {
            resultArray.push([' ', key, file1[key]]);
          } else {
            resultArray.push(['-', key, file1[key]]);
            resultArray.push(['+', key, file2[key]]);
          }
        }
        if (_.has(file1, key) && !_.has(file2, key)) {
          resultArray.push(['-', key, file1[key]]);
        }
        if (!_.has(file1, key) && _.has(file2, key)) {
          resultArray.push(['+', key, file2[key]]);
        }
      });
      const fin = resultArray.map(([status, key, value]) => `\t${status} ${key}: ${value}`);

      console.log(`{\n${fin.join('\n')}\n}`);
    });

  program.parse(process.argv);
};

gendiff();
