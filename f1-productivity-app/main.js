const { app, BrowserWindow, ipcMain, screen } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  // Get primary display size
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  mainWindow = new BrowserWindow({
    width: 150,
    height: 100,
    x: width - 200,  // Position near top-right
    y: 50,
    frame: false,           // No window frame
    transparent: true,      // Transparent background
    alwaysOnTop: true,      // Stay above other windows
    skipTaskbar: true,      // Don't show in taskbar
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  mainWindow.loadFile('src/renderer/index.html');
  
  // Remove menu bar
  mainWindow.setMenuBarVisibility(false);

  // Ignore mouse events to click through (optional)
  // mainWindow.setIgnoreMouseEvents(true);

  // Open DevTools in development
  if (process.argv.includes('--dev')) {
    mainWindow.webContents.openDevTools();
  }
}

// App lifecycle
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// IPC Handlers - Communication between renderer and main
ipcMain.on('move-car', (event, position) => {
  // Handle car movement
  const { x, y } = position;
  mainWindow.setPosition(x, y);
});

ipcMain.on('quit-app', () => {
  app.quit();
});