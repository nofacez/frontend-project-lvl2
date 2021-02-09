/* eslint-disable import/extensions */
import { Command } from 'commander';
import finddiff from '../src/finddiff.js';

const program = new Command();

function errorColor(str) {
  // Add ANSI escape codes to display text in red.
  return `\x1b[31m${str}\x1b[0m`;
}

program
  .configureOutput({
    // Visibly override write routines as example!
    writeOut: (str) => process.stdout.write(`[OUT] ${str}`),
    writeErr: (str) => process.stdout.write(`[ERR] ${str}`),
    // Output errors in red.
    outputError: (str, write) => write(errorColor(str)),
  });

program
  .version('0.0.1')
  .arguments('<filepath1>, <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action((file1, file2) => console.log(finddiff(file1, file2, program.format)));

program.parse(process.argv);

// export default gendiff;
