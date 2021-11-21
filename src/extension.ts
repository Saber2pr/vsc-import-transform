import * as vscode from 'vscode'

import { COM_DIR, COM_MAIN } from './constants'
import { getWorkspaceTsCompiler } from './getWorkspaceTsCompiler'
import { transformDir, transformFile } from './transformFile'
import { setTs } from './TsCompiler'

// install
export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand(COM_MAIN, async (uri: vscode.Uri) => {
      // get current ts compiler
      setTs(getWorkspaceTsCompiler())

      const path = uri.fsPath
      if (path) {
        transformFile(path)
      }
    }),
    vscode.commands.registerCommand(COM_DIR, async (uri: vscode.Uri) => {
      // get current ts compiler
      setTs(getWorkspaceTsCompiler())

      const path = uri.fsPath
      if (path) {
        transformDir(path)
      }
    })
  )
}

// uninstall
export function deactivate() {}
