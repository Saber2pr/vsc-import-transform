import { parseImportNames } from './parseImportNames'
import { utils } from './util'

interface TransformLibrary {
  libraryName: string
  libraryDirectory: string
  customName?: (name: string) => string
}

export function transformLibraryImport(
  code: string,
  library: TransformLibrary
) {
  let newCode = code

  const imports = parseImportNames(code)
  const antdImports = imports.filter(
    statement => statement.library === library.libraryName && statement.bindings
  )
  // import { Button, Input } from 'antd'
  // -->  import Button from 'antd/lib/button'
  // -->  import Input from 'antd/lib/input'
  const newImports = antdImports.map(statement => {
    const bindings = statement.bindings
    const imports = bindings.map(componentName => {
      const newComponentName = library.customName
        ? library.customName(componentName)
        : componentName
      return `import ${componentName} from "${statement.library}${library.libraryDirectory}/${newComponentName}";`
    })
    return {
      pos: statement.pos + 1,
      end: statement.end,
      text: imports.join('\n'),
    }
  })

  for (const newImport of newImports) {
    newCode = utils.replaceRange(
      newCode,
      newImport.pos,
      newImport.end,
      newImport.text
    )
  }

  return newCode
}

const transformLibrarys: TransformLibrary[] = [
  {
    libraryName: 'antd',
    libraryDirectory: '/lib',
    customName: (name: string) => name.toLowerCase(),
  },
  { libraryName: '@ant-design/icons', libraryDirectory: '' },
]

export function transform(code: string) {
  let newCode = code

  for (const library of transformLibrarys) {
    newCode = transformLibraryImport(newCode, library)
  }

  return newCode
}
