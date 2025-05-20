import { app, BrowserWindow, session, WebContents } from 'electron';
import * as path from 'path';

function createWindow(): void {
  // Create the browser window
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  // Load the index.html from the React build
  const indexPath = path.join(__dirname, 'webapp/index.html');
  console.log('Attempting to load:', indexPath);

  // Set the base directory for loading resources
  mainWindow.webContents.session.setPreloads([path.join(__dirname, 'preload.js')]);

  // Use loadFile which handles relative paths better in Electron
  mainWindow.loadFile(indexPath)
    .then(() => console.log('Successfully started loading the file'))
    .catch((err: Error) => {
      console.error('Failed to load index.html:', err);
    });

  // Set proper content security policy to allow loading local resources
  mainWindow.webContents.session.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': ["default-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';"]
      }
    });
  });

  // Open DevTools to help diagnose issues
  mainWindow.webContents.openDevTools();

  // Log when page finishes loading or fails
  mainWindow.webContents.on('did-finish-load', () => {
    console.log('Page loaded successfully');
  });
}

// Create window when Electron is ready
app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    // On macOS it's common to re-create a window when the dock icon is clicked
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS
app.on('window-all-closed', function () {
  app.quit();
});