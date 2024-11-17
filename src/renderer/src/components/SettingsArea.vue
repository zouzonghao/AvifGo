<template>
    <div class="settings-area">
      
      <form @submit.prevent="saveSettings">
        <div class="form-group">
          <label>GitHub 仓库名</label>
          <input
            v-model="settings.repo"
            placeholder="user/repo"
            required
          >
        </div>
        <div class="form-group">
          <label>仓库分支名</label>
          <input
            v-model="settings.branch"
            placeholder="main"
            required
          >
        </div>
        <div class="form-group">
          <label>GitHub Token</label>
          <input
            v-model="settings.token"
            type="password"
            required
          >
        </div>
        <div class="form-group">
          <label>自定义域名</label>
          <input
            v-model="settings.domain"
            placeholder="https://img.666666.xyz"
            required
          >
        </div>
        <div style="text-align: center;margin-top: 20px;">
          <button type="submit">保存设置</button>
        </div>
        
      </form>
    </div>
  </template>
  
  <script lang="ts" setup>
import { ref, onMounted } from 'vue'
import type { Settings } from '../types/config'
import { toRaw } from 'vue'

const settings = ref<Settings>({
  repo: '',
  branch: '',
  token: '',
  domain: ''
})

onMounted(async () => {
  try {
    const savedSettings = await window.electronAPI.getSettings()
    console.log('从本地获取的设置:', savedSettings)
    console.log('settings:', settings)
    if (savedSettings) {
      settings.value = savedSettings
    }
  } catch (error) {
    console.error('获取设置时出错:', error)
    // 可以在这里设置一些默认值或显示错误提示
  }
})

const saveSettings = async () => {
  try {
    console.log('Settings to save:', toRaw(settings.value))
    await window.electronAPI.saveSettings(toRaw(settings.value))
    alert('设置保存成功！')
  } catch (error) {
    console.error('保存设置时出错:', error)
    alert('设置保存失败：' + error)
  }
}
</script>
  
  <style scoped>
  .settings-area {
    padding: 10px;
    background-color: #f5f5f5;
    border-radius: 16px;
  }
  
  .form-group {
    margin-bottom: 6px;
  }
  
  label {
    display: block;
    margin-bottom: 2px;
  }
  
  input {
    width: 90%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 8px;
  }
  
  button {
    padding: 4px 8px;
    background-color: #2196F3;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #1976D2;
  }
  </style>
