// Preload script runs before the renderer process starts
// This is where you can expose specific Node.js functionality to the renderer

window.addEventListener('DOMContentLoaded', () => {
  console.log('Preload script loaded');
  
  // You can expose versions info to the renderer
  const versions = {
    node: process.versions.node,
    chrome: process.versions.chrome,
    electron: process.versions.electron
  };
  
  // Add version info to the page
  const versionInfo = document.createElement('p');
  versionInfo.innerText = `Using Node.js ${versions.node}, Chrome ${versions.chrome}, and Electron ${versions.electron}`;
  document.body.appendChild(versionInfo);
});
