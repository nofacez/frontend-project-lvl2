#!/usr/bin/env node
/* eslint-disable max-len */
/* eslint-disable import/extensions */
import program from 'commander';
import finddiff from '../src/finddiff.js';

// const program = new Command();

// program
//   .version('0.0.1')
//   .description('Compares two configuration files and shows a difference.')
//   .allowUnknownOption()
//   .helpOption('-h, --help', 'output usage information')
//   .option('-f, --format [type]', 'output format', 'stylish');

// program
//   .arguments('[filepath1] [filepath2]')
//   .action((filepath1, filepath2) => {
//     if (filepath1 === undefined || filepath2 === undefined) {
//       program.outputHelp();
//       return;
//     }
//     console.log(finddiff(filepath1, filepath2, program.format));
//   });

// program.parse(process.argv);

// const options = program.opts();
// if (options.help === true) {
//   program.outputHelp();
// }
// export default finddiff;
program.arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action((filepath1, filepath2) => {
    console.log(finddiff(filepath1, filepath2, program.format));
  })
  .parse(process.argv);
