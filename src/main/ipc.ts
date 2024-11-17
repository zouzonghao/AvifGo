import { ipcMain, clipboard } from 'electron'
import { processMedia } from './ffmpeg'
import { uploadToGitHub } from './github'
import Store from 'electron-store'
const fs = require('fs');

function logToFile(message: string) {
    const date = new Date();
    const logMessage = `[${date.toISOString()}] ${message}\n`;
    fs.appendFile('/Users/macm4/code/AvifGO/app.log', logMessage, (err: any) => {
        if (err) {
            console.error('无法写入日志文件:', err);
        }
    });
}
const store = new Store()

export const setupIPC = () => {
  ipcMain.handle('save-settings', async (_, settings) => {
    try {
      store.set('settings', settings)
      return true
    } catch (error) {
      console.error('设置保存失败:', error)
      return false // 返回 false 表示保存失败
    }
  })

  ipcMain.handle('get-settings', async () => {
    return store.get('settings')
  })

  ipcMain.handle('process-and-upload', async (_, { filePath }) => {
    try {
      logToFile('Input file path:' + filePath)
      const settings = store.get('settings') as any
      const processedFile = await processMedia(filePath)
      logToFile('Processed file path:'+ processedFile)
      
      const uploadedFileName = await uploadToGitHub(
        processedFile,
        processedFile,
        {
          repo: settings.repo,
          branch: settings.branch,
          token: settings.token
        }
      )
  
      const url = `${settings.domain}/${uploadedFileName}`
      const markdownLink = `![](${url})`;
      clipboard.writeText(markdownLink)
      return markdownLink
    } catch (error) {
      console.error('Error processing file:', error)
      throw error
    }
  })
  
}