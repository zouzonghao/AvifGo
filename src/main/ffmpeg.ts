import { spawn } from 'child_process'
import { format } from 'date-fns'
import path from 'path'
import { app } from 'electron'
import fs from 'fs'

function logToFile(message: string) {
    const logPath = path.join(app.getPath('userData'), 'app.log')
    const date = new Date()
    const logMessage = `[${date.toISOString()}] ${message}\n`
    fs.appendFileSync(logPath, logMessage)
}

const ffmpegPath = require('ffmpeg-static').replace('app.asar', 'app.asar.unpacked')

logToFile('FFmpeg path: ' + ffmpegPath)

export const processMedia = async (inputPath: string): Promise<string> => {
  const timestamp = format(new Date(), 'yyyyMMddHHmmssSSS')
  const outputFileName = `${timestamp}.avif`
  const userDataPath = app.getPath('userData')
  const outputPath = path.join(userDataPath, outputFileName)

  logToFile('Input path: ' + inputPath)
  logToFile('Output path: ' + outputPath)

  return new Promise((resolve, reject) => {
    // 确保输入文件存在
    if (!fs.existsSync(inputPath)) {
      logToFile('Input file does not exist: ' + inputPath)
      reject(new Error('Input file does not exist'))
      return
    }

    const ffmpeg = spawn(ffmpegPath, [
      '-i', inputPath,
      '-vf', 'scale=-2:trunc(ih/2)*2',
      '-c:v', 'libsvtav1',
      '-crf', '36',
      '-an',
      outputPath
    ])

    let stdoutData = ''
    let stderrData = ''

    ffmpeg.stdout.on('data', (data) => {
      stdoutData += data
      logToFile('FFmpeg stdout: ' + data)
    })

    ffmpeg.stderr.on('data', (data) => {
      stderrData += data
      logToFile('FFmpeg stderr: ' + data)
    })

    ffmpeg.on('error', (error) => {
      logToFile('FFmpeg spawn error: ' + error.message)
      reject(error)
    })

    ffmpeg.on('close', (code) => {
      logToFile('FFmpeg process exited with code ' + code)
      if (code === 0 && fs.existsSync(outputPath)) {
        resolve(outputPath)
      } else {
        const error = new Error(
          `FFmpeg failed with code ${code}. stderr: ${stderrData}`
        )
        logToFile('FFmpeg error: ' + error.message)
        reject(error)
      }
    })
  })
}