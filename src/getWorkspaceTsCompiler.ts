import { join } from 'path'
import { getRootPath } from './getRootPath'
import vscode from 'vscode'

export function getWorkspaceTsCompiler() {
  const workspace = getRootPath()
  const tslibPath = join(workspace, 'node_modules/typescript/lib/typescript.js')
  try {
    return require(tslibPath)
  } catch (error) {
    console.log(error)
    vscode.window.showErrorMessage(
      `Transform fail, cannot find typescript in current project.`
    )
    return null
  }
}
