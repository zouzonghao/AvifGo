<template>
    <div
      class="upload-area"
      @drop.prevent="handleDrop"
      @dragover.prevent
      @dragenter.prevent
      @paste="handlePaste"
    >
      <div class="upload-box">
        <input
          type="file"
          ref="fileInput"
          @change="handleFileChange"
          accept="image/*,video/*"
          style="display: none"
        >
        <button @click="triggerFileInput">点击上传</button>
        <p>拖拽图片到此处</p>
        <p>支持剪贴板粘贴</p>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue'
  
  const emit = defineEmits<{
    (e: 'file-selected', path: string): void
  }>()
  
  const fileInput = ref<HTMLInputElement | null>(null)
  
  const triggerFileInput = () => {
    fileInput.value?.click()
  }
  
  const handleFileChange = (event: Event) => {
    const target = event.target as HTMLInputElement
    if (target.files && target.files[0]) {
      emit('file-selected', target.files[0].path)
    }
  }
  
  const handleDrop = (event: DragEvent) => {
    const files = event.dataTransfer?.files
    if (files && files[0]) {
      emit('file-selected', files[0].path)
    }
  }
  
  const handlePaste = (event: ClipboardEvent) => {
    const items = event.clipboardData?.items
    if (items) {
      for (const item of items) {
        if (item.type.indexOf('image') !== -1) {
          const file = item.getAsFile()
          if (file) {
            emit('file-selected', file.path)
          }
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .upload-area {
    border: 2px dashed #ccc;
    border-radius: 8px;
    padding: 20px;
    text-align: center;
    min-height: 273px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  
  .upload-box {
    padding: 10px;
  }
  
  button {
    padding: 10px 20px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    margin-bottom: 10px;
  }
  
  button:hover {
    background-color: #45a049;
  }
  </style>