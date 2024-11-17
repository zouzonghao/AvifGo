<template>
  <div class="container">
    <div v-if="showUpload" class="upload-container">
      <UploadArea @file-selected="handleFileSelected" />
      <div class="button-container">
        <button class="button" @click="toggleArea">设置</button>
      </div>
    </div>
    <div v-else class="settings-container">
      <SettingsArea />
      <div class="button-container">
        <button class="button" @click="toggleArea">返回</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import UploadArea from './components/UploadArea.vue'
import SettingsArea from './components/SettingsArea.vue'

const showUpload = ref(true);

function toggleArea() {
  showUpload.value = !showUpload.value;
}

const handleFileSelected = async (filePath: string) => {
  try {
    const markdownLink = await window.electronAPI.processAndUpload(filePath)
    alert(`上传成功！MD格式已复制到剪贴板：${markdownLink}`)
  } catch (error) {
    alert(`上传失败：${error}`)
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column; /* 垂直排列子元素 */
  align-items: stretch; /* 子元素将填充整个容器的宽度 */
  width: 100%; /* 容器宽度占满父容器 */
  max-width: 600px; /* 可选：设置最大宽度 */
  margin: 0 auto; /* 居中对齐 */
}

.upload-container {
  padding: 10px;
  border: 1px solid #ccc;
  margin-bottom: 0px; /* 在上传区域下方添加一些空间 */
}
 .settings-container {
  padding: 10px;
  border: 1px solid #ccc;
  margin-bottom: 0px; /* 在上传区域下方添加一些空间 */
}

.button-container {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  padding: 10px 0px 
}
.button {
  padding: 4px 70px;
  background-color: white;
  color: black;
  border: 1;
  border-radius: 16px;
  cursor: pointer;
  margin-bottom: 0px
  }
</style>
