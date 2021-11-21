import { traverseFromString } from './traverser'
import { ts, tsd } from './TsCompiler'
import { utils } from './util'

export type ImportStatement = {
  library: string
  default?: string
  bindings?: string[]
  file?: string
  pos: number
  end: number
}

export const parseImportNames = (code: string, file?: string) => {
  const result: ImportStatement[] = []
  traverseFromString(code, node => {
    if (ts.isImportDeclaration(node)) {
      const statement: ImportStatement = {
        library: utils.clearStr(node.moduleSpecifier.getText()),
        pos: node.pos,
        end: node.end,
      }
      const defaultImport = node.importClause?.name
      if (defaultImport) {
        statement.default = defaultImport.getText()
      }
      const bindings = node.importClause?.namedBindings as tsd.NamedImports
      if (bindings && bindings.elements) {
        statement.bindings = bindings.elements.map(item => item.getText())
      }
      if (file) {
        statement.file = file
      }
      result.push(statement)
    }
  })
  return result
}
