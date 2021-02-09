/* eslint-disable max-len */
/* eslint-disable import/extensions */
import { Command } from 'commander';
import finddiff from '../src/finddiff.js';

const program = new Command();

program
  .version('0.0.1')
  .arguments('[filepath1] [filepath2]')
  .description('Compares two configuration files and shows a difference.')
  .allowUnknownOption()
  .option('-f, --format [type]', 'output format', 'stylish')
  .action((filepath1, filepath2) => {
    if (filepath1.length && filepath2.length) {
      console.log('Error');
    } else {
      console.log(finddiff(filepath1, filepath2, program.format));
    }
  });

program.parse(process.argv);

export default finddiff;
