export namespace utils {
  /**
   * 清除字符串开头结尾的引号
   */
  export const clearStr = (str: string) =>
    str && str.replace(/^"|^'|"$|'$/g, '')
  export const flat = <T>(arr: T[][]): T[] =>
    arr.reduce((acc, ar) => acc.concat(ar), [])
  export const replaceRange = (
    str: string,
    pos: number,
    end: number,
    newStr: string
  ) => str.slice(0, pos) + newStr + str.slice(end)
}
