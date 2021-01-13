/* eslint-disable import/extensions */
import { Command } from 'commander';
import gendiff from '../src/finddiff.js';

const program = new Command();
program
  .version('0.0.1')
  .arguments('<filepath1>, <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .action((file1, file2) => console.log(gendiff(file1, file2)));

program.parse(process.argv);

// export default gendiff;
