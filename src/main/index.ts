import { app, BrowserWindow } from 'electron'
import { join } from 'path'
import { setupIPC } from './ipc'

let mainWindow: BrowserWindow | null = null

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 300,
    height: 500,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      contextIsolation: true, // 启用上下文隔离
      nodeIntegration: false  // 禁用 Node 集成
    }
  })
  // mainWindow.webContents.openDevTools(); // 启动打开开发者工具

  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:5173') // 默认的 Vite 开发服务器端口
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

app.whenReady().then(() => {

  createWindow()
  setupIPC()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
