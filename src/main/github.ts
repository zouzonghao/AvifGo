import { Octokit } from '@octokit/rest'
import { readFileSync } from 'fs'
import path from 'path'

export const uploadToGitHub = async (
  filePath: string,
  fileName: string,
  config: {
    repo: string,
    branch: string,
    token: string
  }
): Promise<string> => {
  const octokit = new Octokit({ auth: config.token })
  const [owner, repo] = config.repo.split('/')
  
  // 使用 readFileSync 读取文件内容
  const content = readFileSync(filePath, { encoding: 'base64' })
  
  await octokit.repos.createOrUpdateFileContents({
    owner,
    repo,
    path: path.basename(fileName),
    message: `Upload ${path.basename(fileName)}`,
    content,
    branch: config.branch
  })

  return path.basename(fileName)
}
