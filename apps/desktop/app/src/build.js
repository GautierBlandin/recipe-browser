const fs = require('fs-extra');
const path = require('path');

// Define paths
const electronDistPath = path.resolve(__dirname, '../../electron/dist');
const webappDistPath = path.resolve(__dirname, '../../webapp/dist');
const appDistPath = path.resolve(__dirname, '../dist');
const packageAppPath = path.resolve(__dirname, '../package.app.json');

// Log the paths for debugging
console.log('Electron dist path:', electronDistPath);
console.log('Webapp dist path:', webappDistPath);
console.log('App dist path:', appDistPath);

async function buildApp() {
  try {
    // Clean output directory if it exists
    await fs.emptyDir(appDistPath);
    console.log('Cleared output directory');
    
    // Copy Electron files
    await fs.copy(electronDistPath, appDistPath);
    console.log('Copied Electron files');
    
    // Create webapp directory and copy webapp files
    await fs.ensureDir(path.join(appDistPath, 'webapp'));
    await fs.copy(webappDistPath, path.join(appDistPath, 'webapp'));
    console.log('Copied webapp files');
    
    // Copy package.app.json as package.json
    await fs.copy(packageAppPath, path.join(appDistPath, 'package.json'));
    console.log('Copied package.json');
    
    console.log('Build successful!');
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

buildApp();