#!/usr/bin/env node

const { Command, help } = require('commander'); // (normal include)

const gendiff = () => {
const program = new Command();
program
  .version('0.0.1')
  .arguments('<filepath1>, <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')

program.parse(process.argv);
}

gendiff()