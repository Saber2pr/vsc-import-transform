import { ts, tsd } from './TsCompiler'

/**
 * 创建一个ast节点
 */
const createAstNode = (code: string) =>
  ts.createSourceFile(
    `${setTimeout(() => {}, 0)}`,
    code,
    ts.ScriptTarget.ES2015,
    /*setParentNodes */ true
  )

/**
 * 递归遍历ast所有节点
 */
const traverse = (node: tsd.Node, callback: (node: tsd.Node) => void) => {
  callback(node)
  ts.forEachChild(node, node => traverse(node, callback))
}

/**
 * 从一段代码创建一个ast并遍历节点
 */
export const traverseFromString = (
  code: string,
  callback: (node: tsd.Node) => void
) => {
  const root = createAstNode(code)
  traverse(root, callback)
}
