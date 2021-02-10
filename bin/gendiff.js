#!/usr/bin/env node
/* eslint-disable max-len */
/* eslint-disable import/extensions */
import program from 'commander';
import finddiff from '../src/finddiff.js';

program.arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action((filepath1, filepath2) => {
    console.log(finddiff(filepath1, filepath2, program.format));
  });

program.parse(process.argv);
