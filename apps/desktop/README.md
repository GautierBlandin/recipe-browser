# Desktop App

This directory contains the desktop application structure for the recipe browser.

## Directory Structure

- **webapp/**: Defines the React application that serves as the frontend UI
- **electron/**: Contains Electron-specific files for the desktop wrapper
- **app/**: Contains build code to merge webapp and electron into a runnable desktop application

## Running the App

Available commands:

```bash
# Build the desktop app (combines webapp and electron)
nx build desktop-app

# Run the desktop app in development mode
nx serve desktop-app

# Run the desktop app in production mode
nx serve desktop-app

# Package the app for distribution
nx package desktop-app
```

The build process copies the webapp and electron distributions into a single runnable application in the `app/dist` directory.
