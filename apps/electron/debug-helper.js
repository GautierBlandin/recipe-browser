// This file helps with debugging Electron apps
const fs = require('fs');
const path = require('path');

function logDirectoryContents(dirPath) {
  console.log(`\nContents of directory: ${dirPath}`);
  try {
    const files = fs.readdirSync(dirPath);
    files.forEach(file => {
      const filePath = path.join(dirPath, file);
      const stats = fs.statSync(filePath);
      if (stats.isDirectory()) {
        console.log(`📁 ${file}/`);
      } else {
        console.log(`📄 ${file} (${stats.size} bytes)`);
      }
    });
  } catch (err) {
    console.error(`Error reading directory: ${err.message}`);
  }
}

module.exports = {
  logDirectoryContents
};
