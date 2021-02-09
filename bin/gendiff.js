/* eslint-disable import/extensions */
import { Command } from 'commander';
import finddiff from '../src/finddiff.js';

const program = new Command();

program
  .version('0.0.1')
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .allowUnknownOption()
  .option('-f, --format [type]', 'output format', 'stylish')
  .action((file1, file2) => console.log(finddiff(file1, file2, program.format), process.argv));

program.parse(process.argv);

export default finddiff;
