import { readFile, writeFile } from 'fs'
import { promisify } from 'util'
import * as vscode from 'vscode'

import { COM_MAIN } from './constants'
import { getWorkspaceTsCompiler } from './getWorkspaceTsCompiler'
import { transform } from './transform'
import { setTs } from './TsCompiler'

// install
export function activate() {
  vscode.commands.registerCommand(COM_MAIN, async (uri: vscode.Uri) => {
    // get current ts compiler
    setTs(getWorkspaceTsCompiler())

    const path = uri.fsPath
    if (path) {
      try {
        const buf = await promisify(readFile)(path)
        const code = buf.toString()
        const newCode = transform(code)
        await promisify(writeFile)(path, newCode)
      } catch (error) {
        console.log(error)
        vscode.window.showErrorMessage('Transform fail.')
      }
    }
  })
}

// uninstall
export function deactivate() {}
