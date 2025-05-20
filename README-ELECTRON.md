# Electron Integration for Recipe Browser

This document describes how to use the Electron integration in the Recipe Browser application.

## Overview

The application consists of:
- A React frontend (`apps/desktop`) built with Vite
- An Electron app (`apps/electron`) that loads the React application

## Development Workflow

### Starting the Development Environment

To start the development environment with hot-reloading:

```bash
npm run electron:dev
```

This command:
1. Builds the React app in watch mode
2. Watches for changes in the Electron app
3. Automatically restarts the Electron app when changes are detected

### Running the Application

To run the application without watch mode:

```bash
npm run electron
```

This runs the Electron app with the latest build of the React app.

### Building the Application

To build the application:

```bash
npm run electron:build
```

This builds both the React app and prepares the Electron app.

## Architecture

- The React app is built into `apps/electron/output`
- The Electron app loads the React app from this directory
- Development mode uses a watcher script to monitor for changes

## Adding Electron-specific Features

To add Electron-specific features:

1. Update the `preload.js` script to expose any needed APIs
2. Access these APIs from the React app

Example:

```js
// In preload.js
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  openFile: () => ipcRenderer.invoke('dialog:openFile')
});

// In React component
const handleFileOpen = async () => {
  const filePath = await window.electronAPI.openFile();
  // Use the file path
};
```

## Packaging for Distribution

To package the app for distribution, you can extend the `package` target in `apps/electron/project.json`.

For full packaging, install electron-builder and configure it in the project.

## Configuration Details

The integration is configured through:
- `apps/desktop/project.json` - Controls the React build targets
- `apps/electron/project.json` - Controls the Electron build and serve targets
- `apps/desktop/vite.config.ts` - Configures the build output directory
- `apps/electron/main.js` - Configures how Electron loads the React app