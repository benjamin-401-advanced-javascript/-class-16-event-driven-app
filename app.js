'use strict';

const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const events = require('./src/events.js');
require('./src/logger.js');

/**
 * takes a file and makes it's contents uppercase then resaves it
 * @param {*} filepath
 */
const alterFile = async (filepath) => {
  const file = await getFile(filepath)
  let fileContent = upperCaseFile(file);
  await saveFile(filepath, fileContent)
}

/**
 * make file content upper case
 * @param {*} filepath
 * @returns {*} the contents of the file as a string
 */
const getFile = async (filepath) => {
  return readFile(filepath)
    .then(data => {
      console.log(data)
      const content = data.toString()
      events.emit('read', content);
      return content;
    })
    .catch(error => {
      events.emit('error', error);
    })
}

/**
 * make file content upper case
 * @param {*} fileContent
 * @returns {*} the contents of the file upper cased
 */
const upperCaseFile = (fileContent) => {
  const content = fileContent.toUpperCase();
  events.emit('altered', content);
  return content;
}

/**
 * make file content lower case
 * @param {*} fileContent
 * @returns {*} the contents of the file lower cased
 */
const lowerCaseFile = (fileContent) => {
  const content = fileContent.toLowerCase();
  events.emit('altered', content);
  return content;
}

/**
 * saves fileContect to filePath location
 * @param {*} filepath
 * @param {*} fileContent
 */
const saveFile = async (filepath, fileContent) => {
  return writeFile(filepath, Buffer.from(fileContent))
    .then(() => {
      events.emit('saved', filepath);
    })
    .catch(error => {
      events.emit('error', error);
    })
}

// let testFilePath = './test-content.txt'
// alterFile(testFilePath);

module.exports = { saveFile, lowerCaseFile, upperCaseFile, getFile, alterFile };

