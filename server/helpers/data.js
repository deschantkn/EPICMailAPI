/**
 * Library for storing and editing data
 */

//  Dependencies
import fs from 'fs';
import path from 'path';
import parseJsonToObject from './jsonToObject';

// Container for the module (to be exported)
const lib = {};

// Base directory of the data folder
lib.baseDir = path.join(__dirname, '/../data/');

// Write data to a file
lib.create = (dir, file, data) => new Promise((resolve, reject) => {
  // Open the file for writing
  fs.open(`${lib.baseDir}${dir}/${file}.json`, 'wx', (openError, fileDescriptor) => {
    if (!openError && fileDescriptor) {
      // Convert data to string
      const stringData = JSON.stringify(data);

      // Write to file and close it
      fs.writeFile(fileDescriptor, stringData, (writeErr) => {
        if (!writeErr) {
          fs.close(fileDescriptor, (closeErr) => {
            if (!closeErr) {
              resolve(false);
            } else {
              reject(closeErr);
            }
          });
        } else {
          reject(writeErr);
        }
      });
    } else {
      reject(openError);
    }
  });
});

// Read data from a file
lib.read = (dir, file) => new Promise((resolve, reject) => {
  fs.readFile(`${lib.baseDir}${dir}/${file}.json`, 'utf8', (err, data) => {
    if (!err && data) {
      const parsedData = parseJsonToObject(data);
      resolve(parsedData);
    } else {
      reject(err);
    }
  });
});

// Update data inside a file
lib.update = (dir, file, data) => new Promise((resolve, reject) => {
  // Open the file for writing
  fs.open(`${lib.baseDir}${dir}/${file}.json`, 'r+', (openErr, fileDescriptor) => {
    if (!openErr && fileDescriptor) {
      const stringData = JSON.stringify(data);
      // Truncate the file
      fs.truncate(fileDescriptor, (truncateErr) => {
        if (!truncateErr) {
          fs.writeFile(fileDescriptor, stringData, (writeErr) => {
            if (!writeErr) {
              fs.close(fileDescriptor, (closeErr) => {
                if (!closeErr) {
                  resolve(false);
                } else {
                  reject(closeErr);
                }
              });
            } else {
              reject(writeErr);
            }
          });
        } else {
          reject(truncateErr);
        }
      });
    } else {
      reject(openErr);
    }
  });
});

lib.delete = (dir, file) => new Promise((resolve, reject) => {
  // Unlink the file
  fs.unlink(`${lib.baseDir}${dir}/${file}.json`, (unlinkErr) => {
    if (!unlinkErr) {
      resolve(false);
    } else {
      reject(unlinkErr);
    }
  });
});

// List all the items in a directory
lib.list = dir => new Promise((resolve, reject) => {
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
