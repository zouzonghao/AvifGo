import { contextBridge, ipcRenderer } from 'electron'

// 暴露安全的 API 到渲染进程
contextBridge.exposeInMainWorld('electronAPI', {
  saveSettings: (settings: any) => ipcRenderer.invoke('save-settings', settings),
  getSettings: () => ipcRenderer.invoke('get-settings'),
  processAndUpload: (filePath: string) => 
    ipcRenderer.invoke('process-and-upload', { filePath })
})

// 声明类型
declare global {
  interface Window {
    electronAPI: {
      saveSettings: (settings: any) => Promise<boolean>
      getSettings: () => Promise<any>
      processAndUpload: (filePath: string) => Promise<string>
    }
  }
}