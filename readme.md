
# AvifGo

一个基于 Electron + Vue3 + ffmpeg 的图片上传工具，可以将图片转换为 AVIF 格式并自动上传至 GitHub，支持拖拽上传和剪贴板粘贴。

## ✨ 功能特点

- 🖼️ 支持图片转换为 AVIF 格式
- 📎 支持拖拽上传
- 📋 支持剪贴板粘贴
- 🔄 自动上传至 GitHub
- 🔗 自动生成 Markdown 格式的图片链接
- 🌐 支持自定义域名
- 💻 跨平台支持 (Windows, macOS, Linux)

## 🚀 快速开始

### 环境要求

- Node.js 16.0 或更高版本 ([下载地址](https://nodejs.org/))
- Git ([下载地址](https://git-scm.com/downloads))

### Windows 用户指南

1. **安装必要工具**
   ```bash
   # 检查 Node.js 版本
   node -v
   
   # 检查 npm 版本
   npm -v
   ```

2. **克隆项目**
   ```bash
   git clone https://github.com/zouzonghao/AvifGo.git
   cd AvifGo
   ```

3. **安装依赖**
   ```bash
   npm install
   ```
4. **替换ffmpeg**

   第三方模块为了控制大小，ffmpeg 都是不带 libsvtav1 编码器的。

   所以需要下载全功能的 ffmpeg 替换模块中的残血 ffmpeg。
   
   [下载-ffmpeg-git-full.7z](https://www.gyan.dev/ffmpeg/builds/ffmpeg-git-full.7z)
   
   解压后复制 `bin/ffmpeg.exe` 至 `node_modules/@ffmpeg-installer/win32-x64` 目录下替换。


5. **开发模式运行**
   ```bash
   npm run dev
   ```

6. **构建应用**
   ```bash
   # 只构建 Windows 版本
   npm run build:win
   
   # 构建结果在 builder-dist 目录下：
   # - avif-go-Windows-1.0.0-Setup.exe (安装版)
   # - avif-go.exe (便携版)
   ```

### macOS 用户指南

1. **安装必要工具**
   ```bash
   # 通过 Homebrew 安装 Node.js
   brew install node
   
   # 检查安装
   node -v
   npm -v
   ```

2. **克隆项目**
   ```bash
   git clone https://github.com/zouzonghao/AvifGo.git
   cd AvifGo
   ```

3. **安装依赖**
   ```bash
   npm install
   ```
4. **替换ffmpeg**

   第三方模块为了控制大小，ffmpeg 都是不带 libsvtav1 编码器的。

   所以需要下载全功能的 ffmpeg 替换模块中的残血 ffmpeg。

   [下载-ffmpeg71arm.zip](https://www.osxexperts.net/ffmpeg71arm.zip)
   
   解压后复制 `ffmpeg` 至 `node_modules/@ffmpeg-installer/darwin-arm64` 目录下替换。

5. **开发模式运行**
   ```bash
   npm run dev
   ```

6. **构建应用**
   ```bash
   # 只构建 macOS 版本
   npm run build:mac
   
   # 构建结果在 builder-dist 目录下：
   # - avif-go-Mac-1.0.0-Installer.dmg (安装包)
   # - avif-go-Mac-1.0.0-Installer.zip (压缩版)
   ```

### Linux 用户指南

1. **安装必要工具**
   ```bash
   # Ubuntu/Debian
   sudo apt update
   sudo apt install nodejs npm
   
   # Fedora
   sudo dnf install nodejs npm
   
   # 检查安装
   node -v
   npm -v
   ```

2. **克隆项目**
   ```bash
   git clone https://github.com/zouzonghao/AvifGo.git
   cd AvifGo
   ```

3. **安装依赖**
   ```bash
   npm install
   ```

4. **替换ffmpeg**

   第三方模块为了控制大小，ffmpeg 都是不带 libsvtav1 编码器的。

   所以需要下载全功能的 ffmpeg 替换模块中的残血 ffmpeg。
   
   解压后复制 `ffmpeg` 至 `node_modules/@ffmpeg-installer/xxxxx` 目录下替换。

5. **开发模式运行**
   ```bash
   npm run dev
   ```

6. **构建应用**
   ```bash
   # 只构建 Linux 版本
   npm run build:linux
   
   # 构建结果在 builder-dist 目录下：
   # - avif-go-Linux-1.0.0.AppImage
   # - avif-go-Linux-1.0.0.deb
   ```

## 📝 可用的构建命令

| 命令 | 说明 |
|------|------|
| `npm run dev` | 启动开发服务器，用于开发调试 |
| `npm run build` | 构建前端资源 |
| `npm run build:win` | 构建 Windows 版本 |
| `npm run build:mac` | 构建 macOS 版本 |
| `npm run build:linux` | 构建 Linux 版本 |
| `npm run build:all` | 构建所有平台版本 |

## ⚙️ 配置说明

在应用中，你需要配置以下信息：

1. **GitHub 仓库名**：格式为 `用户名/仓库名`
2. **仓库分支名**：如 `main` 或 `master`
3. **GitHub Token**：用于授权上传
   - 去 GitHub [创建一个新的 token](https://github.com/settings/tokens/new)
   - 需要的权限：`repo` 权限
4. **自定义域名**：图片访问的域名
   - 格式如：`https://i.example.com`

## 🔧 常见问题解决

### Windows 相关问题

1. **构建时提示 Python 相关错误**
   - 安装 Python（2.7 或 3.x 版本）
   - 将 Python 添加到系统环境变量

2. **提示缺少 Visual Studio 相关组件**
   - 下载安装 [Visual Studio Build Tools](https://visualstudio.microsoft.com/visual-cpp-build-tools/)
   - 安装时选择"Desktop development with C++"

3. **electron-builder 下载超时**
   - 设置淘宝镜像：
     ```bash
     npm config set ELECTRON_MIRROR https://cdn.npmmirror.com/binaries/electron/
     npm config set ELECTRON_BUILDER_BINARIES_MIRROR https://cdn.npmmirror.com/binaries/electron-builder-binaries/
     ```

### macOS 相关问题

1. **构建时提示权限错误**
   ```bash
   sudo chown -R $USER:$GROUP ~/.npm
   sudo chown -R $USER:$GROUP ~/.config
   ```

2. **无法打开应用，提示开发者未验证**
   - 在 System Preferences > Security & Privacy 中允许打开

### Linux 相关问题

1. **构建 AppImage 失败**
   ```bash
   sudo apt install libfuse2
   ```

2. **运行时缺少依赖**
   ```bash
   # Ubuntu/Debian
   sudo apt install libglib2.0-0 libnss3 libatk1.0-0 libatk-bridge2.0-0 libcups2 libdrm2 libgtk-3-0
   ```


