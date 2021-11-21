import type tsd from 'typescript/lib/typescript'
let ts: typeof import('typescript/lib/typescript')

export { tsd, ts }

export function setTs(_ts: typeof ts) {
  ts = _ts
}
