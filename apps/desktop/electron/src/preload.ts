import { contextBridge, ipcRenderer } from 'electron';

// Preload script runs in isolated context
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector: string, text: string): void => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };

  for (const dependency of ['chrome', 'node', 'electron']) {
    replaceText(`${dependency}-version`, process.versions[dependency] || '');
  }
});

// Expose recipe API to the renderer process
contextBridge.exposeInMainWorld('recipeAPI', {
  onAddRecipeClick: () => ipcRenderer.send('recipe:add-clicked')
});
