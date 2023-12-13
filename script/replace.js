const replace = require('replace-in-file');
const path = require('path');
const chalk = require('chalk');

const { log } = console;

const replaceOptions = {
  // replace all files under ai-schema folder
  files: path.resolve(__dirname, '../dist/ai-schema/**/*'),
  // replace all the string that match the regex
  // not start with /preauth/assets

  from: /\/?(?<!preauth\/)assets\//g,
  // repalce the firt match string group to '/preauth/assets/'
  to: '/preauth/assets/',
  countMatches: true
};

const replaceFiles = () => {
  try {
    const results = replace.sync(replaceOptions);
    log(chalk.green('Replaced success:'), results);
  } catch (error) {
    log(chalk.red('Replaced error'), error);
  }
}

replaceFiles();

log(chalk.green('Replacement done'));

// Path: script/replace.js
