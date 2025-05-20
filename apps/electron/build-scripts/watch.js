// watch.js - For development with auto-reload
const { spawn } = require('child_process');
const electron = require('electron');
const path = require('path');
const fs = require('fs');

// Kill process on exit
let electronProcess = null;
process.on('SIGINT', () => {
  if (electronProcess) {
    electronProcess.kill();
  }
  process.exit();
});

// Function to start Electron
function startElectron() {
  if (electronProcess) {
    electronProcess.kill();
    electronProcess = null;
  }

  console.log('Starting Electron app...');
  electronProcess = spawn(electron, [path.join(__dirname, '../build')], {
    stdio: 'inherit'
  });

  electronProcess.on('close', () => {
    console.log('Electron app closed');
  });
}

// Watch for changes in the webapp directory
const webappDir = path.join(__dirname, '../build/webapp');

// Initial start
console.log('Watching for changes in React app...');
if (fs.existsSync(path.join(webappDir, 'index.html'))) {
  startElectron();
} else {
  console.log('Waiting for React build to complete...');
  
  // Poll for index.html
  const checkBuild = setInterval(() => {
    if (fs.existsSync(path.join(webappDir, 'index.html'))) {
      clearInterval(checkBuild);
      startElectron();
    }
  }, 1000);
}

// Watch for changes in webapp directory
fs.watch(webappDir, { recursive: true }, (eventType, filename) => {
  if (filename && filename.endsWith('.js') || filename.endsWith('.html') || filename.endsWith('.css')) {
    console.log(`File ${filename} changed, restarting app...`);
    startElectron();
  }
});

// Also restart when Electron files change
const electronFiles = [
  path.join(__dirname, '../main.js'),
  path.join(__dirname, '../preload.js')
];

electronFiles.forEach(file => {
  fs.watchFile(file, (curr, prev) => {
    if (curr.mtime !== prev.mtime) {
      console.log(`${file} changed, restarting Electron...`);
      startElectron();
    }
  });
});