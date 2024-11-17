import { spawn } from 'child_process'
import { format } from 'date-fns'
import path from 'path'
import { app } from 'electron'

const ffmpegPath = require('ffmpeg-static');

export const processMedia = async (inputPath: string): Promise<string> => {
  const timestamp = format(new Date(), 'yyyyMMddHHmmssSSS')
  const outputFileName = `${timestamp}.avif`
  
  //   userDataPath
  //   Windows:   %APPDATA%\<appname>
  //   macOS:     ~/Library/Application Support/<appname>
  //   Linux:     ~/.config/<appname>
  const userDataPath = app.getPath('userData')
  const outputPath = path.join(userDataPath, outputFileName)
  
  return new Promise((resolve, reject) => {
    const ffmpeg = spawn(ffmpegPath, [
        '-i', inputPath,
        '-vf', 'scale=-2:trunc(ih/2)*2',
        '-c:v', 'libsvtav1',
        '-crf', '36',
        '-an',
        outputPath
    ]);

    ffmpeg.on('close', (code) => {
      if (code === 0) {
        resolve(outputPath)
      } else {
        reject(new Error('FFmpeg processing failed'))
      }
    })
    ffmpeg.stderr.on('data', (data) => {
      console.error(`FFmpeg Error: ${data}`)
    })
  })
}