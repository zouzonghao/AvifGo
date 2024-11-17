import { spawn } from "child_process";
import { format } from "date-fns";
import path from "path";
import { app } from "electron";
const fs = require("fs");

function logToFile(message: string) {
  const date = new Date();
  const logMessage = `[${date.toISOString()}] ${message}\n`;
  fs.appendFile("/Users/macm4/code/AvifGO/app.log", logMessage, (err: any) => {
    if (err) {
      console.error("无法写入日志文件:", err);
    }
  });
}
// const ffmpegPath = require("ffmpeg-static");
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;


logToFile("FFmpeg path:" + ffmpegPath);


export const processMedia = async (inputPath: string): Promise<string> => {
  const timestamp = format(new Date(), "yyyyMMddHHmmssSSS");
  const outputFileName = `${timestamp}.avif`;

  //   userDataPath
  //   Windows:   %APPDATA%\<appname>
  //   macOS:     ~/Library/Application Support/<appname>
  //   Linux:     ~/.config/<appname>
  const userDataPath = app.getPath("userData");
  const outputPath = path.join(userDataPath, outputFileName);

  return new Promise((resolve, reject) => {
    const ffmpeg = spawn(ffmpegPath, [
      "-i",
      inputPath,
      "-vf", "scale=-2:trunc(ih/2)*2",
      "-c:v", "libsvtav1",
      "-crf", "36",
      "-an",
      "-f", "avif",
      outputPath,
    ]);
    logToFile("outputPath :" + outputPath);

    ffmpeg.stdout.on("data", (data) => {
      logToFile(`stdout: ${data}`);
    });
    ffmpeg.on("close", (code) => {
      if (code === 0) {
        resolve(outputPath);
      } else {
        reject(new Error("FFmpeg processing failed"));
      }
    });
    ffmpeg.stderr.on("data", (data) => {
      logToFile(`FFmpeg Error: ${data}`);
    });
  });
};
