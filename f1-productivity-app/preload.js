const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods to renderer process
contextBridge.exposeInMainWorld('electron', {
  moveCar: (position) => ipcRenderer.send('move-car', position),
  quitApp: () => ipcRenderer.send('quit-app')
});