/**
 * Library for storing and editing data
 */

//  Dependencies
import fs from 'fs';
import path from 'path';
import async from 'async';
import parseJsonToObject from './jsonToObject';

const db = {
  tokens: [],
  messages: [],
  users: [],
};

// Container for the module (to be exported)
const lib = {};

// Base directory of the data folder
lib.baseDir = path.join(__dirname, '/../data/');

// Write data to a file
lib.create = (dir, file, newData) => new Promise((resolve, reject) => {
  if (dir in db) {
    db[dir].push(newData);
    resolve(false);
  } else {
    reject(new Error('Data does not exist'));
  }
});

// Read data from a file
lib.read = (dir, file) => new Promise((resolve, reject) => {
  if (dir in db) {
    const result = db[dir].filter(data => data.id === parseInt(file, 10));
    if (result.length === 0) {
      reject(new Error('Data does not exist'));
    }
    resolve(result[0]);
  } else {
    reject(new Error('Data does not exist'));
  }
});

lib.delete = (dir, file) => new Promise((resolve, reject) => {
  if (dir in db) {
    const data = db[dir].filter(d => d.id !== file);
    db[dir].splice(0).push(data);
    resolve(false);
  } else {
    reject(new Error('Data does not exist'));
  }
});

// List all the items in a directory
lib.list = dir => new Promise((resolve, reject) => {
  if (dir in db) {
    const trimmedFilenames = [];
    async.forEach(db[dir], (item, callback) => {
      trimmedFilenames.push(item.id);
      callback();
    }, () => {
      resolve(trimmedFilenames);
    });
  } else {
    reject(new Error('Data does not exist'));
  }

  fs.readdir(`${lib.baseDir}${dir}/`, (readErr, data) => {
    if (!readErr && data && data.length > 0) {
      const trimmedFilenames = [];
      data.forEach((fileName) => {
        trimmedFilenames.push(fileName.replace('.json', ''));
      });
      resolve(trimmedFilenames);
    } else if (!readErr && data.length === 0) {
      resolve([]);
    } else {
      reject(readErr);
    }
  });
});

export default lib;
