import { readFile, writeFile } from 'fs'
import { promisify } from 'util'
import vscode, { window } from 'vscode'

import { transform } from './transform'
import { walkFile } from './walkFile'

export async function transformFile(path: string) {
  try {
    const buf = await promisify(readFile)(path)
    const code = buf.toString()
    const newCode = transform(code)
    await promisify(writeFile)(path, newCode)
  } catch (error) {
    console.log(error)
    window.showErrorMessage('Transform file fail.')
  }
}

export function transformDir(path: string) {
  window.withProgress(
    {
      location: vscode.ProgressLocation.Notification,
      cancellable: true,
      title: `Transform Import in path: ${path}`,
    },
    async progress => {
      try {
        progress.report({ increment: 0 })
        const files = await walkFile(path, entry =>
          /\.(ts|tsx)$/.test(entry.path)
        )
        await Promise.all(files.map(file => transformFile(file.path)))
      } catch (error) {
        console.log(error)
        window.showErrorMessage('Transform dir fail.')
      } finally {
        progress.report({ increment: 100 })
      }
    }
  )
}
